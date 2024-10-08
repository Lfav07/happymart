import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AddProductPage() {
    const { t } = useTranslation();
    const [product, setProduct] = useState({
        name: '',
        image: '',
        company: '',
        category: '',
        quantity: '',
        price: '',
        weight: '',
        description: ''
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:8080/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.post('http://localhost:8080/products', product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/products');
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <div>
            <h1>{t('addProduct')}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder={t('productName')} required />
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder={t('imageUrl')} required />
                <input type="text" name="company" value={product.company} onChange={handleChange} placeholder={t('company')} required />

                <label htmlFor="category">{t('category')}</label>
                <select name="category" value={product.category} onChange={handleChange} required>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder={t('quantity')} required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder={t('price')} required />
                <input type="number" name="weight" value={product.weight} onChange={handleChange} placeholder={t('weight')} required />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder={t('description')} required />

                <button type="submit">{t('addProduct')}</button>
            </form>
            <button type="button" onClick={() => navigate('/admin/products')}>{t('backToCatalog')}</button>
        </div>
    );
}

export default AddProductPage;
