#!/bin/bash

# MarketLink Alwaysdata Deployment Script
# Usage: bash setup_alwaysdata.sh '<DB_PASSWORD>'

PASSWORD="$1"

if [ -z "$PASSWORD" ]; then
    echo "Error: Database password is required."
    echo "Usage: bash setup_alwaysdata.sh '<DB_PASSWORD>'"
    exit 1
fi

cat << EOF > .env
APP_NAME=MarketLink
APP_ENV=production
APP_KEY=base64:Ch+zcUDXOVNjT9BagvzfSUKZzOcx5xWQjJgmXif5YMQ=
APP_DEBUG=true
APP_URL=https://marketlink-api.alwaysdata.net

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql-marketlink-api.alwaysdata.net
DB_PORT=3306
DB_DATABASE=marketlink-api_db
DB_USERNAME=marketlink-api
DB_PASSWORD="${PASSWORD}"

SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=marketlink118@gmail.com
MAIL_PASSWORD=kyzshhqizttdrnjf
MAIL_FROM_ADDRESS="marketlink118@gmail.com"
MAIL_FROM_NAME="MarketLink Portal"
EOF

echo "==> Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan storage:link

echo "==> MarketLink Backend is now ready!"
