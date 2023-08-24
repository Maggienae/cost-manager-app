import React, { useState } from 'react';
import './App.css';

function App() {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [description, setDescription] = useState('');
  const [costItems, setCostItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Adding a new item
      const newCostItem = { sum, category, description };
      setCostItems([...costItems, newCostItem]);
    } else {
      // Updating an existing item
      const updatedCostItems = [...costItems];
      updatedCostItems[editIndex] = { sum, category, description };
      setCostItems(updatedCostItems);
      setEditIndex(-1); // Reset editIndex
    }
    setSum('');
    setCategory('FOOD');
    setDescription('');
  };


  const handleEdit = (index) => {
    const editedItem = costItems[index];
    setSum(editedItem.sum);
    setCategory(editedItem.category);
    setDescription(editedItem.description);
    setEditIndex(index);
  };

  const handleSave = (index) => {
    const updatedCostItems = [...costItems];
    updatedCostItems[index] = { sum, category, description };
    setCostItems(updatedCostItems);
    setEditIndex(-1);
    setSum('');
    setCategory('FOOD');
    setDescription('');
  };

  const handleDelete = (index) => {
    const updatedCostItems = [...costItems];
    updatedCostItems.splice(index, 1);
    setCostItems(updatedCostItems);
    setEditIndex(-1);
  };

  const categories = ['FOOD', 'HEALTH', 'EDUCATION', 'TRAVEL', 'HOUSING', 'CLOTHING', 'TECHNOLOGY', 'OTHER'];

  const getCategoryTotal = (category) => {
    return costItems.reduce((total, item) => {
      if (item.category === category) {
        return total + parseFloat(item.sum);
      }
      return total;
    }, 0);
  };
  return (
      <div className="App container">
        <h1 className="my-4">Cost Manager App</h1>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
                className="form-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
              <option value="FOOD">FOOD</option>
              <option value="HEALTH">HEALTH</option>
              <option value="EDUCATION">EDUCATION</option>
              <option value="TRAVEL">TRAVEL</option>
              <option value="HOUSING">HOUSING</option>
              <option value="CLOTHING">CLOTHING</option>
              <option value="TECHNOLOGY">TECHNOLOGY</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sum" className="form-label">
              Sum:
            </label>
            <input
                type="number"
                className="form-control"
                id="sum"
                value={sum}
                onChange={(e) => setSum(e.target.value)}
                required
                step="0.01"
                min="0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editIndex === -1 ? 'Add Cost Item' : 'Update Cost Item'}
          </button>
        </form>
        <div className="cost-list">
          <h2 className="my-3"><strong>Cost Items</strong></h2>
          <table className="table">
            <thead>
            <tr>
              <th>Category</th>
              <th>Sum</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {costItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="FOOD">FOOD</option>
                          <option value="HEALTH">HEALTH</option>
                          <option value="EDUCATION">EDUCATION</option>
                          <option value="TRAVEL">TRAVEL</option>
                          <option value="HOUSING">HOUSING</option>
                          <option value="CLOTHING">CLOTHING</option>
                          <option value="TECHNOLOGY">TECHNOLOGY</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                    ) : (
                        item.category
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                        <input
                            type="number"
                            value={sum}
                            onChange={(e)=> setSum(Math.max(0,parseFloat(e.target.value)))}
                            min="0"
                        />
                    ) : (
                        item.sum
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    ) : (
                        item.description
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSave(index)}
                        >
                          Save
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                    )}
                  </td>
                  <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="total-cost">
          <h2 className="my-3"><strong> Total Cost Per Category</strong></h2>
          <table className="table">
            <thead>
            <tr>
              <th>Category</th>
              <th>Total Cost</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((cat) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>{getCategoryTotal(cat).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;
