import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import imageWater from '../assets/download.webp';

const WaterSelection = ({ onSelect, onDeselect, setSubtotalPrice }) => {
    const [waterProducts, setWaterProducts] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    useEffect(() => {
        fetchWaterProducts();
    }, []);

    const fetchWaterProducts = () => {
        const mockWaterProducts = [
            { id: 1, name: 'Natural Spring Water', price: 5.99, src: imageWater, category: 'Water' },
            { id: 2, name: 'Purified Drinking Water', price: 4.99, src: imageWater, category: 'Water' },
        ];
        setWaterProducts(mockWaterProducts);
    };

    const handleSelectProduct = (selectedProduct) => {
        const updatedProducts = waterProducts.map(product => {
            if (product.id === selectedProduct.id) {
                return { ...product, isSelected: true };
            }
            return product;
        });

        const updatedIds = [...selectedProductIds, selectedProduct.id];
        setSelectedProductIds(updatedIds);
        setWaterProducts(updatedProducts);
        onSelect(selectedProduct);

        updateSubtotalPrice(updatedProducts, updatedIds);
    };

    const handleDeselectProduct = (deselectedProduct) => {
        const updatedProducts = waterProducts.map(product => {
            if (product.id === deselectedProduct.id) {
                return { ...product, isSelected: false };
            }
            return product;
        });

        const updatedIds = selectedProductIds.filter(id => id !== deselectedProduct.id);
        setSelectedProductIds(updatedIds);
        setWaterProducts(updatedProducts);
        onDeselect(deselectedProduct);

        updateSubtotalPrice(updatedProducts, updatedIds);
    };

    const updateSubtotalPrice = (products, ids) => {
        const subtotalPrice = products
            .filter(product => ids.includes(product.id))
            .reduce((total, product) => total + product.price, 0);

        setSubtotalPrice(subtotalPrice);
    };

    return (
        <div className="water-selection">
            <h2>Select Water Products</h2>
            <div className="water-products">
                {waterProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleSelectProduct}
                        onDeselect={handleDeselectProduct}
                    />
                ))}
            </div>
        </div>
    );
};

export default WaterSelection;
