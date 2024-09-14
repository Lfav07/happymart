import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompleteProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="CompleteProductList">
            <h1>Product List</h1>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> <br/>
                            <img src={product.image} alt={product.name} width="100" /> <br/>
                            <strong>Company:</strong> {product.company} <br/>
                            <strong>Category:</strong> {product.category.name} <br/>
                            <strong>Price:</strong> ${product.price} <br/>
                            <strong>Quantity:</strong> {product.quantity} <br/>
                            <strong>Weight:</strong> {product.weight}g <br/>
                            <strong>Description:</strong> {product.description} <br/>
                        </li>
                    ))
                ) : (
                    <li>No products found.</li>
                )}
            </ul>
        </div>
    );
}

export default CompleteProductList;
