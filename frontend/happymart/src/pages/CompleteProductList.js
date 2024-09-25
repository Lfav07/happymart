import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CompleteProductList() {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();

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
                if (error.response && error.response.status === 403) {
                    navigate('/login', { replace: true });
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('jwt');

            const cartResponse = await axios.get(`http://localhost:8080/carts/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!cartResponse.data || !cartResponse.data.id) {
                alert('Failed to retrieve cart. Please try again.');
                return;
            }

            const cartId = cartResponse.data.id;


            const addItemResponse = await axios.post(
                `http://localhost:8080/carts/${cartId}/items`,
                null,
                {
                    params: {
                        productId,
                        quantity: 1
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart.');
        }
    };

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
                            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                        </li>
                    ))
                ) : (
                    <li>No products found.</li>
                )}
            </ul>
            <button onClick={() => navigate('/home')}>Home</button>
        </div>
    );
}

export default CompleteProductList;
