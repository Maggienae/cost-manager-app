import React, { useState } from 'react';
import './App.css';

function App() {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [description, setDescription] = useState('');
  const [costItems, setCostItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCostItem = { sum, category, description };
    setCostItems([...costItems, newCostItem]);
    setSum('');
    setCategory('FOOD');
    setDescription('');
  };

  return (
      <div className="App">
        <h1>Cost Manager App</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="sum">Sum:</label>
          <input
              type="number"
              id="sum"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
              required
          />
          <br />

          <label htmlFor="category">Category:</label>
          <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
          >
            <option value="FOOD">FOOD</option>
            <option value="HEALTH">HEALTH</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="HOUSING">HOUSING</option>
            <option value="OTHER">OTHER</option>
          </select>
          <br />

          <label htmlFor="description">Description:</label>
          <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
          />
          <br />

          <button type="submit">Add Cost Item</button>
        </form>
        <div className="cost-list">
          <h2>Cost Items</h2>
          <ul>
            {costItems.map((item, index) => (
                <li key={index}>
                  <strong>Category:</strong> {item.category} |{' '}
                  <strong>Sum:</strong> {item.sum} |{' '}
                  <strong>Description:</strong> {item.description}
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
