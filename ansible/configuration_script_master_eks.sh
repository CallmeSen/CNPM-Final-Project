#!/usr/bin/env bash
set -euo pipefail

: "${PROJECT_REPOSITORY_URL:?Set PROJECT_REPOSITORY_URL to the Git repository that should be deployed.}"

PROJECT_DIR="${PROJECT_DIR:-/opt/cnpm-final-project}"
PROJECT_BRANCH="${PROJECT_BRANCH:-main}"

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

apt-get update
apt-get install -y git

if [[ -d "${PROJECT_DIR}/.git" ]]; then
  git -C "${PROJECT_DIR}" fetch --prune origin
  git -C "${PROJECT_DIR}" checkout "${PROJECT_BRANCH}"
  git -C "${PROJECT_DIR}" pull --ff-only origin "${PROJECT_BRANCH}"
else
  git clone --branch "${PROJECT_BRANCH}" "${PROJECT_REPOSITORY_URL}" "${PROJECT_DIR}"
fi
