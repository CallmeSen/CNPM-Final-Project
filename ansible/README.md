# CNPM Ansible Automation

This directory contains the infrastructure automation used for the project demo:

- `playbook_ec2_create.yml` provisions EC2 instances and a security group.
- `playbook_configuration_master.yml` configures the Kubernetes control-plane node.
- `playbook_configuration_worker.yml` configures worker nodes and optionally joins them to the cluster.
- `playbook_monitoring_all.yml` installs Prometheus, node_exporter, and Grafana.
- `docker.sh` builds and pushes project images without storing Docker credentials in Git.

## Requirements

Install Ansible collections before running the AWS playbook:

```bash
ansible-galaxy collection install -r ansible/requirements.yml
```

For EC2 provisioning, configure AWS credentials with environment variables, AWS SSO, or an AWS profile. Do not commit AWS keys, Docker passwords, kubeconfig files, or Kubernetes secret manifests.

## Inventory

Edit `ansible/hosts` with your own public IPs or DNS names:

```ini
[master]
master ansible_host=203.0.113.10 ansible_user=ubuntu

[worker]
worker-1 ansible_host=203.0.113.11 ansible_user=ubuntu
worker-2 ansible_host=203.0.113.12 ansible_user=ubuntu

[monitoring]
monitoring-1 ansible_host=203.0.113.13 ansible_user=ubuntu
```

## Provision EC2

```bash
export AWS_REGION=us-east-1
export EC2_IMAGE_ID=ami-xxxxxxxxxxxxxxxxx
export EC2_KEY_NAME=my-keypair
export EC2_ALLOWED_CIDR="$(curl -s https://checkip.amazonaws.com)/32"

ansible-playbook ansible/playbook_ec2_create.yml
```

## Configure Kubernetes

```bash
ansible-playbook -i ansible/hosts ansible/playbook_configuration_master.yml
```

Copy the `kubeadm join ...` command from the master playbook output and pass it to the worker playbook:

```bash
ansible-playbook -i ansible/hosts ansible/playbook_configuration_worker.yml \
  -e "kubeadm_join_command='kubeadm join <master>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>'"
```

## Configure Monitoring

```bash
ansible-playbook -i ansible/hosts ansible/playbook_monitoring_all.yml
```

## Build and Push Images

```bash
export DOCKER_USERNAME=my-dockerhub-user
export DOCKER_PASSWORD='use-a-token-here'
export DOCKER_IMAGE_NAMESPACE=my-dockerhub-user
export IMAGE_TAG=latest

./ansible/docker.sh
```

`DOCKER_PASSWORD` should be a Docker access token supplied by your shell or CI secret store.
