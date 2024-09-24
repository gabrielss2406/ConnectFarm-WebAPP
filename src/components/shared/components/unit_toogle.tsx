import React from 'react';

interface UnitToggleButtonProps {
    onUnitChange: (unit: string) => void;
    currentUnit: string;
}

const UnitToggleButton: React.FC<UnitToggleButtonProps> = ({ onUnitChange, currentUnit }) => {
    const toggleUnit = () => {
        const newUnit = currentUnit === 'kg' ? 'arroba' : 'kg';
        onUnitChange(newUnit);
        localStorage.setItem('unit', newUnit);
    };

    return (
        <button
            onClick={toggleUnit}
            className={`p-2 rounded m-2 transition-colors duration-300 
                ${currentUnit === 'kg' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
        >
            {currentUnit === 'kg' ? 'Peso em kg' : 'Peso em arrobas'}
        </button>
    );
};

export default UnitToggleButton;
