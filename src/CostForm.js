import React, { useState } from 'react';

function CostForm({ addCostItem }) {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('FOOD');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addCostItem({ sum, category, description });
        setSum('');
        setCategory('FOOD');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Add Cost</button>
        </form>
    );
}

export default CostForm;
