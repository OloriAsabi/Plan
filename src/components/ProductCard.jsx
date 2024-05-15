import React, { useState } from 'react';

const ProductCard = ({ product, onSelect, onDeselect, onUpdatePaymentPlan }) => {
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('one-time');

    const calculateMonthlyPayment = (total, months) => (total / months).toFixed(2);

    const handlePaymentPlanChange = (event) => {
        const plan = event.target.value;
        setSelectedPaymentPlan(plan);
        onUpdatePaymentPlan(product, plan);
    };

    return (
        <div className="product-card">
            <div key={product.id} className="product-item">
                <div className="product-card-inner">
                    <img className="product-image" src={product.src} alt={product.name} />
                    <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-category">Category: {product.category}</p>
                        <p className="product-price">Price: ${product.price}</p>
                        {product.category === 'Dispenser' && (
                            <div className="payment-options">
                                <h4>Payment Options:</h4>
                                <ul>
                                    <li>
                                        <label>
                                            <input
                                                type="radio"
                                                value="one-time"
                                                checked={selectedPaymentPlan === 'one-time'}
                                                onChange={handlePaymentPlanChange}
                                            />
                                            One-time payment: ${product.price.toFixed(2)}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="radio"
                                                value="6-months"
                                                checked={selectedPaymentPlan === '6-months'}
                                                onChange={handlePaymentPlanChange}
                                            />
                                            6 months plan: ${calculateMonthlyPayment(product.price, 6)} / month
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="radio"
                                                value="12-months"
                                                checked={selectedPaymentPlan === '12-months'}
                                                onChange={handlePaymentPlanChange}
                                            />
                                            12 months plan: ${calculateMonthlyPayment(product.price, 12)} / month
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {product.isSelected ? (
                            <button className="select-button" onClick={() => onDeselect(product)}>Deselect</button>
                        ) : (
                            <button className="select-button" onClick={() => onSelect(product, selectedPaymentPlan)}>Select</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
