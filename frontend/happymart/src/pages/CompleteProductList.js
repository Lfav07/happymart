import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/CompleteProductList.css';

function CompleteProductList() {
 const { t } = useTranslation();
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
                <h1>{t('product_list')}</h1>

                <select onChange={(e) => setSelectedCategoryId(e.target.value)} value={selectedCategoryId}>
                    <option value="">{t('all_products')}</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleFilterByCategory}>{t('filter')}</button>

                <ul>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <strong>{t('company')}:</strong> {product.company}
                                    <strong>{t('category')}:</strong> {product.category.name}
                                    <strong>{t('price')}:</strong> ${product.price.toFixed(2)}
                                    <strong>{t('weight')}:</strong> {product.weight}g
                                    <strong>{t('description')}:</strong> {product.description}
                                    <button onClick={() => handleAddToCart(product.id)}>{t('add_to_cart')}</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>{t('no_products_found')}</li>
                    )}
                </ul>

                {totalPages > 1 && (
                    <div className="pagination">
                        {currentPage > 1 && (
                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>{t('previous')}</button>
                        )}

                        {currentPage < totalPages && (
                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>{t('next')}</button>
                        )}
                    </div>
                )}

                <button onClick={() => navigate('/home')}>{t('home')}</button>
            </div>
        );
    }

    export default CompleteProductList;
