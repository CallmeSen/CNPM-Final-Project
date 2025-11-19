#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

export DEBIAN_FRONTEND=noninteractive

KUBERNETES_VERSION_CHANNEL="${KUBERNETES_VERSION_CHANNEL:-v1.30}"
KUBEADM_JOIN_COMMAND="${KUBEADM_JOIN_COMMAND:-}"

apt-get update
apt-get install -y apt-transport-https ca-certificates containerd curl docker.io gnupg

cat >/etc/modules-load.d/k8s.conf <<'EOF'
overlay
br_netfilter
EOF
modprobe overlay
modprobe br_netfilter

cat >/etc/sysctl.d/k8s.conf <<'EOF'
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
EOF
sysctl --system

mkdir -p /etc/docker
cat >/etc/docker/daemon.json <<'EOF'
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
systemctl enable --now docker containerd
systemctl restart docker

mkdir -p /etc/containerd
containerd config default | sed 's/SystemdCgroup = false/SystemdCgroup = true/' >/etc/containerd/config.toml
systemctl restart containerd

mkdir -p /etc/apt/keyrings
curl -fsSL "https://pkgs.k8s.io/core:/stable:/${KUBERNETES_VERSION_CHANNEL}/deb/Release.key" \
  -o /etc/apt/keyrings/kubernetes-apt-keyring.asc
chmod 0644 /etc/apt/keyrings/kubernetes-apt-keyring.asc
cat >/etc/apt/sources.list.d/kubernetes.list <<EOF
deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.asc] https://pkgs.k8s.io/core:/stable:/${KUBERNETES_VERSION_CHANNEL}/deb/ /
EOF

apt-get update
apt-get install -y kubeadm kubelet
apt-mark hold kubeadm kubelet
systemctl enable kubelet

if [[ -n "${KUBEADM_JOIN_COMMAND}" && ! -f /etc/kubernetes/kubelet.conf ]]; then
  ${KUBEADM_JOIN_COMMAND}
fi
