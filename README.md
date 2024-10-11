# HappyMart - Java Spring Supermarket


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

This Project is a Supermarket that features users, products and orders. HappyMart is built in Java and Spring Boot for the backend,
And React for the frontend, MYSQL for database, and Docker for containerization.

## Features
- Manage users, Products, and orders.
- REST API for CRUD operations.
- Responsive React frontend.
- Internationalization support with i18next.
- Docker setup for easy deployment.
- MYSQL database.
- JWT authentication.
- 
## Requirements

- Java 21 (or JDK 21)
- Maven 3.8+
- Node.js 18+ (for React frontend)
- Docker (optional, for containerization)
- MySQL (for database)

## Setup and Installation

### MySQL Setup
1. Configure your database connection in the Spring Boot application. Update your `application.properties` file with the following settings:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/happymarket
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

### Backend


1. Clone the repository:

   ```bash
   git clone https://github.com/lfav07/library-management-system.git
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
   cd ../frontend/book-app
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Run the React application:

   ```bash
   npm start
   ```

4. Access the frontend at: `http://localhost:3000`

## API Endpoints

For detailed API documentation, including example requests and responses, please see the [API Documentation](./API.md).


