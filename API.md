# API Endpoints


### Authorization
If you're using Postman or another API management tool, make sure to include the JWT returned from login in the request headers:

- **Authorization**: Bearer `jwt_token_here`

JWT token is usually like this: ``eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyODM0ODAzNywiZXhwIjoxNzI4MzY2MDM3fQ.1NNXJLpvQc0TEp1zLYiIuTCnSSqSJPUkxGJwpeQikZg`` 

## Users

### **Register User**  
  `POST http://localhost:8080/api/auth/register`

Example body:
```json
{
  "username": "johndoe",
  "password": "password123",
  "email": "johndoe@example.com"
}

```

### **Login User**  
  `POST http://localhost:8080/api/auth/login`

Example body:
```json
{
  "username": "johndoe",
  "password": "password123"
}

```

### **Register Admin**  
  `POST http://localhost:8080/api/admin/create-admin`

Example body:
```json
{
  "username": "admin",
  "password": "adminpassword",
  "email": "admin@example.com"
}

```
### Note: Admin login is done in the same endpoint as users, and with the same body.

### **Login  Admin**  
  `POST http://localhost:8080/api/auth/login`

Example body:
```json
{
  "username": "admin",
  "password": "adminpassword"
}

```

### **Get User by id**
#### Replace `{id}` with the desired user ID.
  `GET http://localhost:8080/api/auth/users/id/{id}`

### **Get all users**  
  `GET http://localhost:8080/api/auth/users`

## Categories

### **Create category**  
  `POST http://localhost:8080/categories`

Example body:
```json
{
  "name": "Fruits"
}

```

### **Update category by id** 
- #### Replace `{id}` with the desired category ID.
  `PUT http://localhost:8080/categories/{id}`

Example body:
```json
{
  "name": "New Fruits"
}

```

###  **Get category by id**
- #### Replace `{id}` with the desired category ID.
  `GET http://localhost:8080/categories/{id}`



### **Get all categories**

  `GET http://localhost:8080/categories`



### **Delete category by id**
- #### Replace `{id}` with the desired category ID.
  `DELETE http://localhost:8080/categories/{id}`


## Products

### **Create product**
`POST http://localhost:8080/products`

Example body:
```json
{
  "name": "Apple",
  "company": "AppleExample",
  "image": "https://th.bing.com/th/id/OIP.YdXBRGPr_U6TFYEvwyx80wHaJO?rs=1&pid=ImgDetMain",
  "category": {
    "name": "Fruits"
  },
  "quantity": 100,
  "price": 2,
  "weight": 180,
  "description": "fresh red apple"
}


```









