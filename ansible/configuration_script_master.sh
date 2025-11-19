#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

export DEBIAN_FRONTEND=noninteractive

KUBERNETES_VERSION_CHANNEL="${KUBERNETES_VERSION_CHANNEL:-v1.30}"
KUBERNETES_POD_CIDR="${KUBERNETES_POD_CIDR:-10.244.0.0/16}"
KUBERNETES_APPLY_FLANNEL="${KUBERNETES_APPLY_FLANNEL:-true}"
KUBERNETES_INSTALL_INGRESS="${KUBERNETES_INSTALL_INGRESS:-true}"
KUBERNETES_ADMIN_USER="${KUBERNETES_ADMIN_USER:-${SUDO_USER:-ubuntu}}"
KUBERNETES_ADMIN_HOME="${KUBERNETES_ADMIN_HOME:-/home/${KUBERNETES_ADMIN_USER}}"

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
apt-get install -y kubeadm kubectl kubelet
apt-mark hold kubeadm kubectl kubelet
systemctl enable kubelet

if [[ ! -f /etc/kubernetes/admin.conf ]]; then
  kubeadm init --pod-network-cidr="${KUBERNETES_POD_CIDR}"
fi

install -d -m 0755 -o "${KUBERNETES_ADMIN_USER}" -g "${KUBERNETES_ADMIN_USER}" "${KUBERNETES_ADMIN_HOME}/.kube"
cp /etc/kubernetes/admin.conf "${KUBERNETES_ADMIN_HOME}/.kube/config"
chown "${KUBERNETES_ADMIN_USER}:${KUBERNETES_ADMIN_USER}" "${KUBERNETES_ADMIN_HOME}/.kube/config"
chmod 0600 "${KUBERNETES_ADMIN_HOME}/.kube/config"

if [[ "${KUBERNETES_APPLY_FLANNEL}" == "true" ]]; then
  kubectl --kubeconfig=/etc/kubernetes/admin.conf apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
fi

if [[ "${KUBERNETES_INSTALL_INGRESS}" == "true" ]]; then
  kubectl --kubeconfig=/etc/kubernetes/admin.conf apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml
fi

kubeadm token create --print-join-command
