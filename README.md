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
