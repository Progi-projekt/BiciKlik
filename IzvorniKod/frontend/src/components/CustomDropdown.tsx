import React, { useState } from 'react';

const CustomDropdown = ({ options, value, onChange, onMouseEnter, onMouseLeave }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
        onMouseLeave();
    };

    return (
        <div className="custom-dropdown">
            <div className="selected-value" onClick={handleToggle}>
                {options.find(option => option.value === value)?.label || 'Select a route'}
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map(option => (
                        <div
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option.value)}
                            onMouseEnter={() => onMouseEnter(option.value)}
                            onMouseLeave={onMouseLeave}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;