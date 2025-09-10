# Stars Wars Challenge

**Version:** 1.0  
**OAS Version:** 3.0  
**Description:** API documentation and project setup for the Stars Wars Challenge.

---

## Table of Contents

- [Project Setup](#project-setup)  
- [Modules](#modules)  
- [Authentication](#authentication)  
- [Database Seed](#database-seed)  
- [API Documentation](#api-documentation)  
- [Schemas](#schemas)

---

## Project Setup

1. Copy `.env.example` to `.env` and fill in the required values.  

    Example:

    ```env
    DATABASE_USERNAME="your_db_username"
    DATABASE_PASSWORD="your_db_password"
    DATABASE_NAME="your_db_name"
    DATABASE_HOST="your_db_host"

    DATABASE_URL="postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:5432/${DATABASE_NAME}"

    PORT=8080

    AUTH_0_ISSUER="your_auth0_issuer"
    AUTH_0_AUDIENCE="your_auth0_audience"

    AUTH_0_CLIENT_ID="your_auth0_client_id"
    AUTH_0_CLIENT_SECRET="your_auth0_client_secret"

    AUTH_0_LOGIN_CLIENT_ID="your_auth0_login_client_id"
    AUTH_0_LOGIN_CLIENT_SECRET="your_auth0_login_client_secret"

    START_WARS_API_URL="https://www.swapi.tech"
    ```

  2. Make sure Docker is installed on your machine.

  3. Run the project using Docker Compose:
      ```
      docker compose up
      ```
      This will start both:

      - Database container (PostgreSQL)
      - Server container (NestJS API)

  # Modules

  ### User Module

 ---

  Handles user registration, login, and authentication.

  Uses Auth0 for JWT-based authentication.

  Endpoints: 

      ~/api/users/signup
      ~/api/users/login.

  ### Movie Module

---

  Handles CRUD operations for movies.

  Endpoints: 
  
    ~/api/movies
    ~/api/movies/{id}

  Includes scheduled tasks inside MovieScheduleService to synchronize movies with the ones in the server.

  # Authentication

  Implemented in the User module using Auth0.

  Requires Auth0 credentials in .env:

      
    AUTH_0_ISSUER="your_auth0_issuer"
    AUTH_0_AUDIENCE="your_auth0_audience"

    AUTH_0_CLIENT_ID="your_auth0_client_id"
    AUTH_0_CLIENT_SECRET="your_auth0_client_secret"

    AUTH_0_LOGIN_CLIENT_ID="your_auth0_login_client_id"
    AUTH_0_LOGIN_CLIENT_SECRET="your_auth0_login_client_secret"
      
  All protected routes require a valid JWT from Auth0.

  # Database Seed

  Seed data is located in 

    /prisma/seed.ts

  Automatically executed when the server starts 

    npm run start:prod

  Populates the database with the server movies if there are not movies initially

  # API Documentation

Swagger docs are available at:

    $HOST/docs


All endpoints are prefixed with:

    $HOST/api/$DOMAIN

# Running Tests

    npm run test
    npm run test:e2e
    npm run test:cov


# Lint & Format

    npm run lint
    npm run format