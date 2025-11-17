: "${DOCKER_USERNAME:?Set DOCKER_USERNAME before running this script}"
: "${DOCKER_PASSWORD:?Set DOCKER_PASSWORD before running this script}"

docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"

echo 'auth-service'
cd backend/auth-service
docker build --network host -t "${DOCKER_USERNAME}/auth-service" .
docker push "${DOCKER_USERNAME}/auth-service"
cd ../..


echo 'order-service'
cd backend/order-service
docker build --network host -t "${DOCKER_USERNAME}/order-service" .
docker push "${DOCKER_USERNAME}/order-service"
cd ../..


echo 'restaurant-service'
cd backend/restaurant-service
docker build --network host -t "${DOCKER_USERNAME}/restaurant-service" .
docker push "${DOCKER_USERNAME}/restaurant-service"
cd ../..


echo 'payment-service'
cd backend/payment-service
docker build --network host -t "${DOCKER_USERNAME}/payment-service" .
docker push "${DOCKER_USERNAME}/payment-service"
cd ../..


echo 'client'
cd frontend/client
docker build --network host -t "${DOCKER_USERNAME}/client" .
docker push "${DOCKER_USERNAME}/client"
cd ../..


echo 'admin'
cd frontend/admin
docker build --network host -t "${DOCKER_USERNAME}/admin" .
docker push "${DOCKER_USERNAME}/admin"
cd ../..


echo 'restaurant'
cd frontend/restaurant
docker build --network host -t "${DOCKER_USERNAME}/restaurant" .
docker push "${DOCKER_USERNAME}/restaurant"
cd ../..
