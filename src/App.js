import React, { useState } from 'react';
import './App.css';

function App() {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [description, setDescription] = useState('');
  const [costList, setCostList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCostItem = { sum, category, description };
    setCostList([...costList, newCostItem]);
    setSum('');
    setCategory('FOOD');
    setDescription('');
  };

  return (
      <div className="App">
        <h1>Cost Manager</h1>
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
            {/* List of categories */}
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

          <button type="submit">Add Cost</button>
        </form>
        <div id="costList">
          {costList.map((item, index) => (
              <div className="cost-item" key={index}>
                <strong>Category:</strong> {item.category}<br />
                <strong>Sum:</strong> {item.sum}<br />
                <strong>Description:</strong> {item.description}
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
