import React, { useState } from 'react';
import WaterSelection from './WaterSelection';
import DispenserSelection from './DispenserSelection';
import DeliveryFrequencyStep from './DeliveryFrequencyStep';
import './index.css';

const PlanStructureTabs = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotalPrice, setSubtotalPrice] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(true);

    const handleTabClick = (tabNumber) => {
        setCurrentTab(tabNumber);
    };

    const handlePrevious = () => {
        setCurrentTab(currentTab - 1);
    };

    const handleNext = () => {
        setCurrentTab(currentTab + 1);
    };

    const handleProductSelect = (selectedProduct, paymentPlan) => {
        const updatedProducts = [...selectedProducts, { ...selectedProduct, paymentPlan }];
        setSelectedProducts(updatedProducts);
        setIsNextDisabled(false); // Enable the Next button when a product is selected
    };

    const handleProductDeselect = (deselectedProduct) => {
        const updatedProducts = selectedProducts.filter(product => product.id !== deselectedProduct.id);
        setSelectedProducts(updatedProducts);
        setIsNextDisabled(updatedProducts.length === 0); // Disable the Next button if no products are selected
    };

    const handleFrequencySelect = (frequency) => {
        setSelectedFrequency(frequency);
    };

    const calculateTotalPrice = (products, frequency) => {
        let price = products.reduce((total, product) => {
            let productPrice = product.price;
            if (product.paymentPlan === '6-months') {
                productPrice /= 6;
            } else if (product.paymentPlan === '12-months') {
                productPrice /= 12;
            }
            return total + productPrice;
        }, 0);
        setTotalPrice(price);
        setSubtotalPrice(price * (frequency ? parseInt(frequency, 10) : 1)); // Assuming frequency is a number
    };

    return (
        <div className="plan-structure-tabs">
            <div className="tab-box">
                <div
                    className={`tab-item ${currentTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabClick(1)}
                >
                    Water
                </div>
                <div
                    className={`tab-item ${currentTab === 2 ? 'active' : ''}`}
                    onClick={() => handleTabClick(2)}
                >
                    Dispenser
                </div>
                <div
                    className={`tab-item ${currentTab === 3 ? 'active' : ''}`}
                    onClick={() => handleTabClick(3)}
                >
                    Delivery Frequency
                </div>
            </div>
            <div className="tab-content">
                {currentTab === 1 && (
                    <WaterSelection onSelect={handleProductSelect} onDeselect={handleProductDeselect} setSubtotalPrice={setSubtotalPrice} />
                )}
                {currentTab === 2 && (
                    <DispenserSelection onSelect={handleProductSelect} onDeselect={handleProductDeselect} setSubtotalPrice={setSubtotalPrice} />
                )}
                {currentTab === 3 && (
                    <DeliveryFrequencyStep onSelect={handleFrequencySelect} />
                )}
            </div>
            <div className="navigation-buttons">
                {currentTab !== 1 && (
                    <button onClick={handlePrevious}>Previous</button>
                )}
                {currentTab !== 3 && (
                    <button onClick={handleNext} disabled={isNextDisabled}>Next</button>
                )}
            </div>
            {/* Display total price */}
            {totalPrice > 0 && (
                <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
            )}
            {/* Display subtotal price */}
            <div className="subtotal-price">Subtotal Price: ${subtotalPrice.toFixed(2)}</div>
        </div>
    );
};

export default PlanStructureTabs;
