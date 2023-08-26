/* Eden Bar 209037571
   Maggie Nae 208612234
*/
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  addCost,
  getAllCostItems,
  updateCostItem,
  deleteCostItem,
} from "./idb";
function AddNewItem() {
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("FOOD");
  const [description, setDescription] = useState("");
  const [costItems, setCostItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Adding a new item
      const newCostItem = { sum, category, description, date };

      const newItemId = await addCost(newCostItem); // Add to IndexedDB
      setCostItems((prevCostItems) => [
        ...prevCostItems,
        { ...newCostItem, id: newItemId },
      ]);
    } else {
      // Updating an existing item
      const updatedCostItems = [...costItems];
      updatedCostItems[editIndex] = { sum, category, description, date };
      setCostItems(updatedCostItems);
      setEditIndex(-1); // Reset editIndex
    }
    setSum("");
    setCategory("FOOD");
    setDescription("");
    setDate(new Date());
  };

  useEffect(() => {
    console.log(costItems); // This will log the most up-to-date costItems array
  }, [costItems]);

  const handleEdit = (index) => {
    const editedItem = costItems[index];
    setSum(editedItem.sum);
    setCategory(editedItem.category);
    setDescription(editedItem.description);
    setEditIndex(index);
    setDate(new Date(editedItem.date));
  };

  const handleSave = async (index) => {
    const updatedCostItems = [...costItems];
    updatedCostItems[index] = {
      ...updatedCostItems[index],
      sum,
      category,
      description,
      date,
    };
    await updateCostItem(updatedCostItems[index]); // Update in IndexedDB
    setCostItems(updatedCostItems);
    setEditIndex(-1);
    setSum("");
    setCategory("FOOD");
    setDescription("");

    setDate(new Date());
  };

  const handleDelete = async (index) => {
    const deletedItemId = costItems[index].id;
    await deleteCostItem(deletedItemId); // Delete from IndexedDB
    const updatedCostItems = [...costItems];
    updatedCostItems.splice(index, 1);
    setCostItems(updatedCostItems);
    setEditIndex(-1);
  };

  const categories = [
    "FOOD",
    "HEALTH",
    "EDUCATION",
    "TRAVEL",
    "HOUSING",
    "CLOTHING",
    "TECHNOLOGY",
    "OTHER",
  ];

  const getCategoryTotal = (category) => {
    return costItems.reduce((total, item) => {
      if (item.category === category) {
        return total + parseFloat(item.sum);
      }
      return total;
    }, 0);
  };
  const navigateReports = () => {
    navigate("/reports/");
  };
  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="App container">
      <button onClick={navigateReports}>Reports</button>
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
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            value={formatDate(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
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
          {editIndex === -1 ? "Add Cost Item" : "Update Cost Item"}
        </button>
      </form>

      <div className="cost-list">
        <h2 className="my-3">
          <strong>Cost Items</strong>
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Sum</th>
              <th>Description</th>
              <th>Date</th>
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
                      onChange={(e) =>
                        setSum(Math.max(0, parseFloat(e.target.value)))
                      }
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
                    <input
                      type="date"
                      value={formatDate(date)}
                      onChange={(e) => setDate(new Date(e.target.value))}
                    />
                  ) : (
                    <span>{formatDate(item.date)}</span>
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
        <h2 className="my-3">
          <strong> Total Cost Per Category</strong>
        </h2>
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
export default AddNewItem;
