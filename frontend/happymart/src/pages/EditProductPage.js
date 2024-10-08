import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/EditProductPage.css';

function EditProductPage() {
    const { t } = useTranslation();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndCategories = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const [productResponse, categoriesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/products/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8080/categories', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProduct(productResponse.data);
                setCategories(categoriesResponse.data);

                const existingCategory = categoriesResponse.data.find(cat => cat.id === productResponse.data.category.id);
                if (!existingCategory) {
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        category: categoriesResponse.data[0]
                    }));
                }
            } catch (error) {
                console.error('Error fetching product or categories:', error);
                setErrorMessage(t('failedToLoadProductOrCategories'));
            }
        };

        fetchProductAndCategories();
    }, [id, t]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const selectedCategory = categories.find(category => category.id === parseInt(value));
            setProduct(prevProduct => ({ ...prevProduct, category: selectedCategory }));
        } else {
            setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(`http://localhost:8080/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/products');
        } catch (error) {
            console.error('Error updating the product:', error);
            setErrorMessage(t('failedToUpdateProduct'));
        }
    };

    if (!product) return <p>{t('loading')}</p>;

    return (
        <div>
            <h1>{t('editProduct')}</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">{t('productName')}</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder={t('productNamePlaceholder')} required />

                <label htmlFor="image">{t('imageUrl')}</label>
                <input type="text" name="image" value={product.image} onChange={handleChange} placeholder={t('imageUrlPlaceholder')} required />

                <label htmlFor="company">{t('company')}</label>
                <input type="text" name="company" value={product.company} onChange={handleChange} placeholder={t('companyPlaceholder')} required />

                <label htmlFor="category">{t('category')}</label>
                <select name="category" value={product.category?.id || ''} onChange={handleChange} required>
                    <option value="" disabled>{t('selectCategory')}</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <label htmlFor="quantity">{t('quantity')}</label>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder={t('quantityPlaceholder')} required />

                <label htmlFor="price">{t('price')}</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder={t('pricePlaceholder')} required />

                <label htmlFor="weight">{t('weight')}</label>
                <input type="number" name="weight" value={product.weight} onChange={handleChange} placeholder={t('weightPlaceholder')} required />

                <label htmlFor="description">{t('description')}</label>
                <textarea name="description" value={product.description} onChange={handleChange} placeholder={t('descriptionPlaceholder')} required />

                <button type="submit">{t('updateProduct')}</button>
                <button type="button" onClick={() => navigate('/admin/products')}>{t('backToCatalog')}</button>
            </form>
        </div>
    );
}

export default EditProductPage;
