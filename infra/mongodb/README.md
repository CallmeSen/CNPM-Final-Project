# MongoDB Configuration Guide

## Overview
Mỗi microservice có database MongoDB riêng với user và password riêng để đảm bảo security và isolation.

## Database Configuration

| Service | Database Name | User | Password | Port |
|---------|---------------|------|----------|------|
| Auth | `auth_db` | `auth` | `auth123` | 28016 |
| Restaurant | `restaurant_db` | `restaurant` | `restaurant123` | 28017 |
| Order | `order_db` | `order` | `order123` | 28018 |
| Payment | `payment_db` | `payment` | `payment123` | 28019 |

## Connection Strings

### Auth Service
```
mongodb://auth:auth123@mongodb:27017/auth_db?authSource=auth_db
```

### Restaurant Service
```
mongodb://restaurant:restaurant123@mongodb2:27017/restaurant_db?authSource=restaurant_db
```

### Order Service
```
mongodb://order:order123@mongodb3:27017/order_db?authSource=order_db
```

### Payment Service
```
mongodb://payment:payment123@mongodb4:27017/payment_db?authSource=payment_db
```

## Init Scripts

Các init scripts trong `init-scripts/` folder sẽ tự động:
1. Tạo database cho từng service
2. Tạo user với quyền `readWrite` cho database đó
3. Tạo các collections cơ bản (optional)

**Lưu ý:** Init scripts chỉ chạy khi database được tạo lần đầu. Nếu bạn muốn reset:
```bash
docker-compose down -v
docker-compose up -d
```

## Connecting from Host Machine

Nếu muốn kết nối từ host machine (ví dụ: MongoDB Compass):

### Auth Database
- Host: `localhost`
- Port: `28016`
- Username: `auth`
- Password: `auth123`
- Database: `auth_db`
- Auth Database: `auth_db`

Connection String:
```
mongodb://auth:auth123@localhost:28016/auth_db?authSource=auth_db
```

### Restaurant Database
```
mongodb://restaurant:restaurant123@localhost:28017/restaurant_db?authSource=restaurant_db
```

### Order Database
```
mongodb://order:order123@localhost:28018/order_db?authSource=order_db
```

### Payment Database
```
mongodb://payment:payment123@localhost:28019/payment_db?authSource=payment_db
```

## Admin Access

Mỗi MongoDB instance cũng có admin user:
- Username: `admin`
- Password: `admin123`

Connection string với admin (có thể truy cập tất cả databases):
```
mongodb://admin:admin123@localhost:28016/?authSource=admin
```

## Security Best Practices

⚠️ **PRODUCTION DEPLOYMENT:**
1. Thay đổi tất cả passwords trong file init scripts
2. Update passwords trong `.env.docker`
3. Không commit passwords vào git
4. Sử dụng Docker secrets hoặc environment variables từ CI/CD
5. Enable SSL/TLS cho MongoDB connections
6. Sử dụng strong passwords (minimum 16 characters)

## Troubleshooting

### Database không được tạo tự động
```bash
# Xóa volumes và rebuild
docker-compose down -v
docker-compose up -d --build
```

### Kiểm tra logs của MongoDB
```bash
docker logs mongodb-auth
docker logs mongodb-restaurant
docker logs mongodb-order
docker logs mongodb-payment
```

### Verify database và user đã được tạo
```bash
# Connect vào container
docker exec -it mongodb-auth mongosh -u admin -p admin123 --authenticationDatabase admin

# Trong mongosh shell
show dbs
use auth_db
show collections
db.getUsers()
```

## Backup & Restore

### Backup một database
```bash
docker exec mongodb-auth mongodump -u auth_user -p auth_password123 --authenticationDatabase=auth_db --db=auth_db --out=/data/backup
```

### Restore một database
```bash
docker exec mongodb-auth mongorestore -u auth_user -p auth_password123 --authenticationDatabase=auth_db /data/backup/auth_db
```
