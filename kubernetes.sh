#kubectl delete all --all
kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=<jwt-secret-redacted>
kubectl create secret generic jwt-expiration-time --from-literal=JWT_EXPIRATION_TIME=7d
kubectl create secret generic jwt-access-token-secret --from-literal=JWT_ACCESS_TOKEN_SECRET=<jwt-secret-redacted>
kubectl create secret generic jwt-access-token-expiration-time --from-literal=JWT_ACCESS_TOKEN_EXPIRATION_TIME=1h
kubectl create secret generic jwt-refresh-token-secret --from-literal=JWT_REFRESH_TOKEN_SECRET=<jwt-secret-redacted>
kubectl create secret generic jwt-refresh-token-expiration-time --from-literal=JWT_REFRESH_TOKEN_EXPIRATION_TIME=7d
kubectl create secret generic admin-email --from-literal=ADMIN_EMAIL=admin@sky-ecommerce.com
kubectl create secret generic admin-password --from-literal=ADMIN_PASSWORD=<admin-password-redacted>
kubectl create secret generic stripe-secret-key --from-literal=STRIPE_SECRET_KEY=***REMOVED***

cd infra/k8s
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml

kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

kubectl apply -f ingress-srv-prod.yaml --record=true

export theIPaddress=$(ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)

kubectl patch svc ingress-nginx-controller   -n ingress-nginx -p '{"spec": {"type": "LoadBalancer", "externalIPs":["'"$theIPaddress"'"]}}'


#kubectl apply -f storageclass.yml 

kubectl apply -f auth-mongo.yaml
kubectl apply -f auth.yaml

kubectl apply -f products-mongo.yaml
kubectl apply -f products.yaml

kubectl apply -f orders-mongo.yaml
kubectl apply -f orders.yaml

kubectl apply -f expiration-redis.yaml
kubectl apply -f expiration.yaml

kubectl apply -f payments-mongo.yaml
kubectl apply -f payments.yaml

kubectl apply -f client.yaml

kubectl apply -f ingress-srv-prod.yaml

kubectl rollout restart deployment/auth-deployment
kubectl rollout restart deployment/products-deployment
kubectl rollout restart deployment/orders-deployment
kubectl rollout restart deployment/expiration-deployment
kubectl rollout restart deployment/payments-deployment
kubectl rollout restart deployment/client-deployment



