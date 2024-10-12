# HappyMart - Java Spring Supermarket

#### HappyMart is a comprehensive supermarket management system built using Java Spring for the backend and React for the frontend. It allows users to manage products, orders, and user accounts seamlessly. Designed for developers and businesses alike, HappyMart serves as a ready-to-deploy solution or as a foundation for further customization in e-commerce platforms.
## Table of Contents
- [Overview](#overview)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Setup and Installation](#setup-and-installation)
     - [MySQL Setup](#mysql-setup)
     - [Backend](#backend)
     - [Frontend](#frontend)
  - [API Endpoints](#api-endpoints)

## Overview

This project is a supermarket management system that supports managing users, products, and orders.
## Features
- Manage users, Products, and orders.
  - REST API for CRUD operations.
  - Responsive React frontend.
  - Internationalization support with i18next.
  - Docker setup for easy deployment.
  - MYSQL database.
  - JWT authentication.

## Requirements

- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (or JDK 21)
- [Maven 3.8+](https://maven.apache.org/install.html)
- [Node.js 18+](https://nodejs.org/en/download/) (for React frontend)
- [Docker](https://www.docker.com/get-started) (optional, for containerization)
- [MySQL](https://dev.mysql.com/downloads/installer/) (for database)


## Setup and Installation

### MySQL Setup
1. Configure your database connection in the Spring Boot application. Update your `application.properties` file with the following settings:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/happymarket
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

### Docker Deployment
To run the application with Docker:
```bash
docker-compose up
```

### Backend


1. Clone the repository:

   ```bash
   git clone https://github.com/Lfav07/happymart.git
   ```
   

2. Start MYSQL service in your machine.


3. Install Maven dependencies:

   ```bash
   mvn clean install
   ```

   4. Package the application:

      ```bash
      mvn clean package
      ```

   5. Run the Spring Boot application:

      ```bash
      java -jar target/happymarket.jar
      ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend/happymart
   ```

   2. Install Node.js dependencies:

      ```bash
      npm install
      ```

   3. Run the React application:

      ```bash
      npm start
      ```

   4. Access the user frontend at: `http://localhost:3000`
   5. Access the admin frontend at: `http://localhost:3000/admin/login`

## API Endpoints

For detailed API documentation, including example requests and responses, please see the [API Documentation](./API.md).


