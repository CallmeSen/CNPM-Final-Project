#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

export DEBIAN_FRONTEND=noninteractive

PROMETHEUS_VERSION="${PROMETHEUS_VERSION:-2.52.0}"
NODE_EXPORTER_VERSION="${NODE_EXPORTER_VERSION:-1.8.1}"
INSTALL_GRAFANA="${INSTALL_GRAFANA:-true}"
ARCH="linux-amd64"

apt-get update
apt-get install -y ca-certificates curl gnupg tar

id prometheus >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin prometheus
id node_exporter >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin node_exporter

tmp_dir="$(mktemp -d)"
trap 'rm -rf "${tmp_dir}"' EXIT

curl -fsSL \
  "https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.${ARCH}.tar.gz" \
  -o "${tmp_dir}/prometheus.tar.gz"
tar -xzf "${tmp_dir}/prometheus.tar.gz" -C "${tmp_dir}"

install -m 0755 "${tmp_dir}/prometheus-${PROMETHEUS_VERSION}.${ARCH}/prometheus" /usr/local/bin/prometheus
install -m 0755 "${tmp_dir}/prometheus-${PROMETHEUS_VERSION}.${ARCH}/promtool" /usr/local/bin/promtool
install -d -o prometheus -g prometheus /etc/prometheus /var/lib/prometheus
cp -R "${tmp_dir}/prometheus-${PROMETHEUS_VERSION}.${ARCH}/consoles" /etc/prometheus/
cp -R "${tmp_dir}/prometheus-${PROMETHEUS_VERSION}.${ARCH}/console_libraries" /etc/prometheus/
chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus

cat >/etc/prometheus/prometheus.yml <<'EOF'
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090
  - job_name: node-exporter
    static_configs:
      - targets:
          - localhost:9100
EOF
chown prometheus:prometheus /etc/prometheus/prometheus.yml

cat >/etc/systemd/system/prometheus.service <<'EOF'
[Unit]
Description=Prometheus
After=network-online.target
Wants=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF

curl -fsSL \
  "https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.${ARCH}.tar.gz" \
  -o "${tmp_dir}/node_exporter.tar.gz"
tar -xzf "${tmp_dir}/node_exporter.tar.gz" -C "${tmp_dir}"
install -m 0755 "${tmp_dir}/node_exporter-${NODE_EXPORTER_VERSION}.${ARCH}/node_exporter" /usr/local/bin/node_exporter

cat >/etc/systemd/system/node_exporter.service <<'EOF'
[Unit]
Description=Prometheus Node Exporter
After=network-online.target
Wants=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now prometheus node_exporter

if [[ "${INSTALL_GRAFANA}" == "true" ]]; then
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor --yes -o /etc/apt/keyrings/grafana.gpg
  chmod 0644 /etc/apt/keyrings/grafana.gpg
  echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" >/etc/apt/sources.list.d/grafana.list
  apt-get update
  apt-get install -y grafana
  systemctl enable --now grafana-server
fi
