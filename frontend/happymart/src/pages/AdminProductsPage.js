import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/AdminProductsPage.css';

function AdminProductsPage() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
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

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    const handleEditProduct = (id) => {
        navigate(`/admin/products/edit/${id}`);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://localhost:8080/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('There was an error deleting the product!', error);
            if (error.response && error.response.status === 403) {
                navigate('/login', { replace: true });
            }
        }
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="CompleteProductList">
            <h1>{t('productList')}</h1>
            <button onClick={handleAddProduct}>{t('addProduct')}</button>
            <ul>
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <div>
                                <strong>{product.name}</strong>
                                <strong>{t('company')}:</strong> {product.company}
                                <strong>{t('category')}:</strong> {product.category.name}
                                <strong>{t('price')}:</strong> ${product.price.toFixed(2)}
                                <strong>{t('quantity')}:</strong> {product.quantity}
                                <strong>{t('weight')}:</strong> {product.weight}g
                                <strong>{t('description')}:</strong> {product.description}
                                <div>
                                    <button onClick={() => handleEditProduct(product.id)}>{t('edit')}</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>{t('delete')}</button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>{t('noProductsFound')}</li>
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

            <button onClick={() => navigate('/admin/home')}>{t('home')}</button>
        </div>
    );
}

export default AdminProductsPage;
