import React, { useState } from 'react';

const DeliveryFrequencyStep = ({ onSelect }) => {
    const [selectedFrequency, setSelectedFrequency] = useState('');

    const handleFrequencySelect = (frequency) => {
        setSelectedFrequency(frequency);
        onSelect(frequency);
    };

    return (
        <div className="delivery-frequency-step">
            <h2>Delivery Frequency Selection</h2>
            <div className="frequency-options">
                <ul className='frequency-list'>
                    <li>
                     <label>
                    <input
                        type="radio"
                        value="One-time order"
                        checked={selectedFrequency === 'One-time order'}
                        onChange={() => handleFrequencySelect('One-time order')}
                    />
                    One-time order
                </label>
               <p> Not eligible for $50 off promotion. </p>
             </li>
             <li>
             <label>
                    <input
                        type="radio"
                        value="One month"
                        checked={selectedFrequency === 'One month'}
                        onChange={() => handleFrequencySelect('One month')}
                    />
                    One month
                </label>
                <p> I want to refresh my home water supply once a month.</p>
             </li>
             <li>
             <label>
                    <input
                        type="radio"
                        value="week"
                        checked={selectedFrequency === 'week'}
                        onChange={() => handleFrequencySelect('week')}
                    />
                  Every weeks
                </label>
              <p> I never want to run out of water. Please deliver once a week.</p>
             </li>
             <li>
             <label>
                    <input
                        type="radio"
                        value="Two weeks"
                        checked={selectedFrequency === 'Two weeks'}
                        onChange={() => handleFrequencySelect('Two weeks')}
                    />
                   Every Two weeks
                </label>
              <p>I prefer to get fresh water every other week.</p>
             </li>
             <li>
             <label>
                    <input
                        type="radio"
                        value="Two month"
                        checked={selectedFrequency === 'Two month'}
                        onChange={() => handleFrequencySelect('Two month')}
                    />
                   Every Two months
                </label>
              <p>Delivery every other month is perfect for my household.</p>
             </li>
                </ul>
    
                {/* Add more frequency options here */}
            </div>
        </div>
    );
};

export default DeliveryFrequencyStep;
