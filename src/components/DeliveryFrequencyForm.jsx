import React, { useState } from 'react';
import DeliveryFrequencyStep from './DeliveryFrequencyStep';

const DeliveryFrequencyForm = () => {
    const [selectedFrequency, setSelectedFrequency] = useState('');

    const handleFrequencySelect = (frequency) => {
        setSelectedFrequency(frequency);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFrequency !== '') {
            console.log('Selected Frequency:', selectedFrequency);
            alert(`You have selected: ${selectedFrequency}`);
        } else {
            alert('Please select a delivery frequency.');
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <DeliveryFrequencyStep onSelect={handleFrequencySelect} />
            <div className="form-actions">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default DeliveryFrequencyForm;
