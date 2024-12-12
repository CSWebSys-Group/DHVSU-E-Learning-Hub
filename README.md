# Project Setup Instructions

This guide will walk you through setting up both the frontend and backend of the project. Follow the steps carefully to ensure a smooth setup.

---

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
2. Run frontend:
   ```bash
   npm run dev

---

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
 * OPTIONAL to keep composer up to date
   ```bash
   composer update
2. Install dependencies:
   ```bash
   composer install
  
4. Setting up database:
* For first time setup:
  ```bash
  php artisan migrate
* If you already have the repository and need to sync updated versions:
  ```bash
  php artisan migrate:fresh

5. Seed the database with test/initialized data:
    ```bash
    php artisan db:seed
6. Start the backend server:
    ```bash
    php artisan serve


---

## .env Setup in Backend

      ```bash
      APP_NAME=Laravel
      APP_ENV=local
      APP_KEY=base64:your-app-key-here
      APP_DEBUG=true
      APP_TIMEZONE=UTC
      APP_URL=http://localhost:8000
      FRONTEND_URL=http://localhost:5173
      
      APP_LOCALE=en
      APP_FALLBACK_LOCALE=en
      APP_FAKER_LOCALE=en_US
      
      APP_MAINTENANCE_DRIVER=file
      # APP_MAINTENANCE_STORE=database
      
      CLOUDINARY_URL=cloudinary://<your-cloudinary-url>
      CLOUDINARY_CLOUD_NAME=your-cloud-name
      CLOUDINARY_API_KEY=your-api-key
      CLOUDINARY_API_SECRET=your-api-secret
      
      PHP_CLI_SERVER_WORKERS=4
      
      BCRYPT_ROUNDS=12
      
      LOG_CHANNEL=stack
      LOG_STACK=single
      LOG_DEPRECATIONS_CHANNEL=null
      LOG_LEVEL=debug
      
      DB_CONNECTION=mysql
      DB_HOST=127.0.0.1
      DB_PORT=3309
      DB_DATABASE=your-database-name
      DB_USERNAME=your-database-username
      DB_PASSWORD=your-database-password
      
      SESSION_DRIVER=database
      SESSION_LIFETIME=120
      SESSION_ENCRYPT=false
      SESSION_PATH=/
      SESSION_DOMAIN=null
      
      BROADCAST_CONNECTION=log
      FILESYSTEM_DISK=local
      QUEUE_CONNECTION=database
      
      CACHE_STORE=database
      CACHE_PREFIX=
      
      MEMCACHED_HOST=127.0.0.1
      
      REDIS_CLIENT=phpredis
      REDIS_HOST=127.0.0.1
      REDIS_PASSWORD=null
      REDIS_PORT=6379
      
      MAIL_MAILER=smtp
      MAIL_HOST=smtp.mail-service.com
      MAIL_PORT=587
      MAIL_USERNAME=your-email@example.com
      MAIL_PASSWORD=your-email-password
      MAIL_ENCRYPTION=tls
      MAIL_FROM_ADDRESS=your-email@example.com
      MAIL_FROM_NAME="Your Application Name"
      
      AWS_ACCESS_KEY_ID=
      AWS_SECRET_ACCESS_KEY=
      AWS_DEFAULT_REGION=us-east-1
      AWS_BUCKET=
      AWS_USE_PATH_STYLE_ENDPOINT=false
      
      VITE_APP_NAME="${APP_NAME}"
      
      FIRST_ADMIN_PASSWORD=your-admin-password

---

- Don't forget to paste the cacert.pem file in your php directory

- Inside your php.ini, set this
   ```bash
   upload_max_filesize = 50M
   post_max_size = 50M

- Also in your php.ini, search for **curl.cainfo** and **openssl.cafile** then set them to where the cacert.pem is located in your php directory
   ```bash
   curl.cainfo = C:\php\extras\ssl\cacert.pem
   openssl.cafile=C:\php\extras\ssl\cacert.pem

