import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import imageWater from '../assets/download-1.webp';

const DispenserSelection = ({ onSelect, onDeselect, onUpdatePaymentPlan, setSubtotalPrice }) => {
    const [dispenserProducts, setDispenserProducts] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    useEffect(() => {
        fetchDispenserProducts();
    }, []);

    const fetchDispenserProducts = () => {
        const mockDispenserProducts = [
            { id: 1, name: 'Hot and Cold Water Dispenser', price: 149.99, src: imageWater, category: 'Dispenser' },
            { id: 2, name: 'Bottom Load Water Dispenser', price: 199.99, src: imageWater, category: 'Dispenser' },
        ];
        setDispenserProducts(mockDispenserProducts);
    };

    const handleSelectProduct = (selectedProduct, paymentPlan) => {
        const updatedProducts = dispenserProducts.map(product => {
            if (product.id === selectedProduct.id) {
                return { ...product, isSelected: true, paymentPlan };
            }
            return product;
        });

        const updatedIds = [...selectedProductIds, selectedProduct.id];
        setSelectedProductIds(updatedIds);
        setDispenserProducts(updatedProducts);
        onSelect(selectedProduct, paymentPlan);

        updateSubtotalPrice(updatedProducts, updatedIds);
    };

    const handleDeselectProduct = (deselectedProduct) => {
        const updatedProducts = dispenserProducts.map(product => {
            if (product.id === deselectedProduct.id) {
                return { ...product, isSelected: false, paymentPlan: 'one-time' };
            }
            return product;
        });

        const updatedIds = selectedProductIds.filter(id => id !== deselectedProduct.id);
        setSelectedProductIds(updatedIds);
        setDispenserProducts(updatedProducts);
        onDeselect(deselectedProduct);

        updateSubtotalPrice(updatedProducts, updatedIds);
    };

    const handleUpdatePaymentPlan = (updatedProduct, paymentPlan) => {
        const updatedProducts = dispenserProducts.map(product => {
            if (product.id === updatedProduct.id) {
                return { ...product, paymentPlan };
            }
            return product;
        });

        setDispenserProducts(updatedProducts);
        updateSubtotalPrice(updatedProducts, selectedProductIds);
    };

    const updateSubtotalPrice = (products, ids) => {
        const subtotalPrice = products
            .filter(product => ids.includes(product.id))
            .reduce((total, product) => {
                let productPrice = product.price;
                if (product.paymentPlan === '6-months') {
                    productPrice /= 6;
                } else if (product.paymentPlan === '12-months') {
                    productPrice /= 12;
                }
                return total + productPrice;
            }, 0);

        setSubtotalPrice(subtotalPrice);
    };

    return (
        <div className="dispenser-selection">
            <h2>Select Dispenser Products</h2>
            <div className="dispenser-products">
                {dispenserProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleSelectProduct}
                        onDeselect={handleDeselectProduct}
                        onUpdatePaymentPlan={handleUpdatePaymentPlan}
                    />
                ))}
            </div>
        </div>
    );
};

export default DispenserSelection;
