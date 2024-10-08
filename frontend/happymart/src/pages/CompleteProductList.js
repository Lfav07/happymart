import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/CompleteProductList.css';

function CompleteProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching the categories!', error);
            }
        };

        fetchCategories();
    }, []);

    const handleFilterByCategory = async () => {
        try {
            const token = localStorage.getItem('jwt');
            let response;
            if (selectedCategoryId === '') {

                response = await axios.get('http://localhost:8080/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                response = await axios.get(`http://localhost:8080/products/names?categoryId=${selectedCategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('jwt');
            const cartResponse = await axios.get(`http://localhost:8080/users/${userId}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!cartResponse.data || !cartResponse.data.id) {
                alert('Failed to retrieve or create cart. Please try again.');
                return;
            }

            const requestBody = {
                productId,
                quantity: 1,
            };

            await axios.post(
                `http://localhost:8080/users/${userId}/cart/items`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart.');
        }
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="CompleteProductList">
            <h1>Product List</h1>

            <select onChange={(e) => setSelectedCategoryId(e.target.value)} value={selectedCategoryId}>
                <option value="">All Products</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button onClick={handleFilterByCategory}>Filter</button>

            <ul>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-details">
                                <strong>{product.name}</strong>
                                <strong>Company:</strong> {product.company}
                                <strong>Category:</strong> {product.category.name}
                                <strong>Price:</strong> ${product.price.toFixed(2)}
                                <strong>Weight:</strong> {product.weight}g
                                <strong>Description:</strong> {product.description}
                                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No products found.</li>
                )}
            </ul>

            {totalPages > 1 && (
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                    )}

                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                    )}
                </div>
            )}

            <button onClick={() => navigate('/home')}>Home</button>
        </div>
    );
}

export default CompleteProductList;
