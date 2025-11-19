#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

export DEBIAN_FRONTEND=noninteractive
INSTALL_JENKINS="${INSTALL_JENKINS:-true}"

apt-get update
apt-get install -y ca-certificates curl docker.io git gnupg openjdk-17-jre
systemctl enable --now docker

if [[ "${INSTALL_JENKINS}" == "true" ]]; then
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key -o /etc/apt/keyrings/jenkins-keyring.asc
  chmod 0644 /etc/apt/keyrings/jenkins-keyring.asc
  echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" >/etc/apt/sources.list.d/jenkins.list
  apt-get update
  apt-get install -y jenkins
  usermod -aG docker jenkins
  systemctl enable --now jenkins
fi
