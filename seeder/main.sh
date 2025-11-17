#!/bin/bash

source .env

BASE_URL='http://localhost:5002/api'

SUPER_ADMIN_TOKEN=$(curl --location --request POST "${BASE_URL}/superAdmin/login" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "'$SUPERADMIN_EMAIL'", 
    "password": "'$SUPERADMIN_PASSWORD'"
}' | jq -r '.token')


RESTAURANT_RESPONSE=$(curl --location --request POST "${BASE_URL}/restaurant/register" \
--form "name=Phở 24" \
--form "ownerName=Nguyễn Văn A" \
--form "location=Quận 1, TP.HCM" \
--form "contactNumber=0909123123" \
--form "email=${PHO24_EMAIL}" \
--form "password=${PHO24_PASSWORD}" \
--form 'profilePicture=@"./product-images/pho_bo.webp"')
RESTAURANT_ID=$(echo "${RESTAURANT_RESPONSE}" | jq -r '.restaurant.id')
curl --location --request PUT "${BASE_URL}/superAdmin/restaurant/${RESTAURANT_ID}" \
--header "Authorization: Bearer ${SUPER_ADMIN_TOKEN}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "availability": true
}' >/dev/null
RESTAURANT_TOKEN=$(curl --location --request POST "${BASE_URL}/restaurant/login" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "'${PHO24_EMAIL}'",
    "password": "'${PHO24_PASSWORD}'"
}' | jq -r '.token')
FOOD_ITEM_ID=$(curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Phở Bò" \
--form "description=Đậm đà nước dùng xương bò ninh 12 giờ, dùng kèm rau thơm tươi." \
--form "price=75000" \
--form "category=Món nước" \
--form 'image=@"./product-images/pho_bo.webp"' | jq -r '.newFoodItem._id')
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Bánh Mì Đặc Biệt" \
--form "description=Bánh mì pate, chả lụa, thịt nguội và đồ chua chuẩn vị Sài Gòn." \
--form "price=45000" \
--form "category=Món chính" \
--form 'image=@"./product-images/banh_mi.webp"'
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Chè Đậu Xanh" \
--form "description=Chè nóng nấu cùng nước cốt dừa tươi, topping đậu phộng rang." \
--form "price=30000" \
--form "category=Tráng miệng" \
--form 'image=@"./product-images/chocolate_cake.jpeg"'

RESTAURANT_RESPONSE=$(curl --location --request POST "${BASE_URL}/restaurant/register" \
--form "name=Sushi Kyoto" \
--form "ownerName=Haruto Sato" \
--form "location=Quận 7, TP.HCM" \
--form "contactNumber=0988123456" \
--form "email=${SUSHI_EMAIL}" \
--form "password=${SUSHI_PASSWORD}" \
--form 'profilePicture=@"./product-images/sushi_platter.avif"')
RESTAURANT_ID=$(echo "${RESTAURANT_RESPONSE}" | jq -r '.restaurant.id')
curl --location --request PUT "${BASE_URL}/superAdmin/restaurant/${RESTAURANT_ID}" \
--header "Authorization: Bearer ${SUPER_ADMIN_TOKEN}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "availability": true
}' >/dev/null
RESTAURANT_TOKEN=$(curl --location --request POST "${BASE_URL}/restaurant/login" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "'${SUSHI_EMAIL}'",
    "password": "'${SUSHI_PASSWORD}'"
}' | jq -r '.token')
FOOD_ITEM_ID=$(curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Sushi Tổng Hợp" \
--form "description=12 miếng nigiri và maki với cá hồi Nauy, bạch tuộc và thanh cua." \
--form "price=210000" \
--form "category=Combo" \
--form 'image=@"./product-images/sushi_platter.avif"' | jq -r '.newFoodItem._id')
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Sashimi Cá Hồi" \
--form "description=Cá hồi tươi cắt lát chuẩn sashimi, phục vụ kèm wasabi và gừng chua." \
--form "price=185000" \
--form "category=Món chính" \
--form 'image=@"./product-images/grilled_chicken.jpeg"'
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Salad Rong Nho" \
--form "description=Rong nho trộn sốt mè rang và rau củ tươi mùa." \
--form "price=65000" \
--form "category=Salad" \
--form 'image=@"./product-images/vegan_salad.avif"'

RESTAURANT_RESPONSE=$(curl --location --request POST "${BASE_URL}/restaurant/register" \
--form "name=Royal Biryani" \
--form "ownerName=Rahul Sharma" \
--form "location=Quận Bình Thạnh, TP.HCM" \
--form "contactNumber=0911234567" \
--form "email=${BIRYANI_EMAIL}" \
--form "password=${BIRYANI_PASSWORD}" \
--form 'profilePicture=@"./product-images/biryani.jpeg"')
RESTAURANT_ID=$(echo "${RESTAURANT_RESPONSE}" | jq -r '.restaurant.id')
curl --location --request PUT "${BASE_URL}/superAdmin/restaurant/${RESTAURANT_ID}" \
--header "Authorization: Bearer ${SUPER_ADMIN_TOKEN}" \
--header 'Content-Type: application/json' \
--data-raw '{
    "availability": true
}' >/dev/null
RESTAURANT_TOKEN=$(curl --location --request POST "${BASE_URL}/restaurant/login" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "'${BIRYANI_EMAIL}'",
    "password": "'${BIRYANI_PASSWORD}'"
}' | jq -r '.token')
FOOD_ITEM_ID=$(curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Hyderabadi Biryani" \
--form "description=Cơm basmati với gà ướp masala, nấu kiểu dum truyền thống." \
--form "price=120000" \
--form "category=Món chính" \
--form 'image=@"./product-images/biryani.jpeg"' | jq -r '.newFoodItem._id')
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Tandoori Platter" \
--form "description=Đùi gà nướng than hoa, cá tikka và paneer được phục vụ kèm sốt bạc hà." \
--form "price=150000" \
--form "category=Combo" \
--form 'image=@"./product-images/tandoori_platter.jpeg"'
curl --location --request POST "${BASE_URL}/food-items/create" \
--header "Authorization: Bearer ${RESTAURANT_TOKEN}" \
--form "name=Lassi Xoài" \
--form "description=Sinh tố sữa chua xoài lạnh, trang trí với bột quế và hạt điều." \
--form "price=45000" \
--form "category=Đồ uống" \
--form 'image=@"./product-images/creamy_pasta.jpeg"'