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
  "description": "Fresh red apple"
}

```


### **Update product by id**
- #### Replace `{id}` with the desired product ID.
`PUT http://localhost:8080/products/{id}`

Example body:
```json
{
  "name": "Updated Product",
  "company": "Updated Company",
  "image": "http://example.com/updated-image.jpg",
  "category": {
    "name": "Fruits"
  },
  "quantity": 150,
  "price": 60,
  "weight": 250,
  "description": "This is an updated product description."
}


```

### **Get all products**

`GET http://localhost:8080/products`

### **Get product by id**
- #### Replace `{id}` with the desired product ID.
`GET http://localhost:8080/products/{id}`


### **Get products by category id**
- #### Replace `{id}` with the desired category ID.
`GET http://localhost:8080/products/names?categoryId={id}`

### **Delete product by id**
- #### Replace `{id}` with the desired product ID.
`DELETE http://localhost:8080/products/{id}`

### **Delete all products**

`DELETE http://localhost:8080/products`

## Carts

### **Get or create cart**
- #### Replace `{userId}` with the desired user ID.
`GET http://localhost:8080/users/{userId}/cart`

### **Get all cart items**
- #### Replace `{userId}` with the desired user ID.
`GET http://localhost:8080/users/{userId}/cart/items`

### **Add item to cart**
- #### Replace `{userId}` with the desired user ID.
`POST http://localhost:8080/users/{userId}/cart/items`

Example body:
```json
{
  "productId": 1,
  "quantity": 2
}
```

### **Get cart item by ID** (Retrieves a specific item from the cart.)
- #### Replace {userId} and {cartItemId} with the desired user ID and cart item ID.
`GET http://localhost:8080/users/{userId}/cart/items/{cartItemId}`

### **Update cart item quantity**
- #### Replace {userId} and {cartItemId} with the desired user ID and cart item ID.
`PUT http://localhost:8080/users/{userId}/cart/items/{cartItemId}?newQuantity={newQuantity}`

### **Remove item from cart**
- #### Replace {userId} and {cartItemId} with the desired user ID and cart item ID.
`DELETE http://localhost:8080/users/{userId}/cart/items/{cartItemId}`

### **Clear cart**
- #### Replace {userId} with the desired user ID.
`DELETE http://localhost:8080/users/{userId}/cart/items`

## Orders

### **Create order**
`POST http://localhost:8080/orders`

#### Example request body:
```json
{
  "userId": 1,
  "totalAmount": 100.50,
  "status": "PENDING"
}
```

### **Get all orders**
`GET http://localhost:8080/orders`


### **Get order by order id**
- #### Replace {orderId} with the desired order ID.
`GET http://localhost:8080/orders/{orderId}`

### **Get orders by user id**
- #### Replace {userId} with the desired user ID.
`GET http://localhost:8080/orders/{id}`

### **Update order by id**
- #### Replace {id} with the desired order ID.
`PUT http://localhost:8080/orders/{id}`

#### Example request body:
```json
{
  "userId": 2,
  "totalAmount": 100.50
}
```


### **Update order status by id**
- #### Replace {id} with the desired order ID.
`PATCH http://localhost:8080/orders/{id}/status`

#### Example request body:
```json
{
  "status": "COMPLETED"
}

```

### **Delete Order by id**
- #### Replace {id} with the desired user ID.
`DELETE http://localhost:8080/orders/{id}`


## Order Items

### Note: {orderId} refers to the order id, not the order item id

### **Create Order item**
- #### Replace {orderId} with the desired order ID.
`POST http://localhost:8080/orders/{orderId}/items`

#### Example request body:
```json
{
  "product": {
    "id": 1
  },
  "quantity": 2,
  "price": 50
}


```

### **Get order items by id**
- #### Replace {orderId} with the desired order ID.
`GET http://localhost:8080/orders/{orderId}/items`

### **Get all order items** (From all orders)

`GET http://localhost:8080/orders/items`












































