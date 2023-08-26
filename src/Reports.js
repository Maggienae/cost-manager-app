/* Eden Bar 209037571
   Maggie Nae 208612234
*/
import React, { useState } from "react";
import { getAllCostItems } from "./idb";

function Reports() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleShowExpenses = async () => {
    if (!year || !month) {
      alert("Please select both year and month.");
      return;
    }

    const allCostItems = await getAllCostItems();
    const filteredExpenses = allCostItems.filter((item) => {
      const itemYear = new Date(item.date).getFullYear();
      const itemMonth = new Date(item.date).getMonth() + 1;
      return itemYear.toString() === year && itemMonth.toString() === month;
    });

    const calculateTotalSum = (expenses) => {
      return expenses.reduce((total, expense) => {
        const expenseSum = parseFloat(expense.sum);
        return total + expenseSum;
      }, 0);
    };

    const total = calculateTotalSum(filteredExpenses);

    setExpenses(filteredExpenses);
    setTotalExpenses(total);
  };

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="container">
      <div>
        <h1>Expense Report</h1>
        <div>
          <label>Year</label>
          <div>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Month</label>
          <div>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShowExpenses}
          >
            Show expenses
          </button>
        </div>
        <div>
          <span>Total expenses for selected period: {totalExpenses}</span>
        </div>
      </div>

      {expenses.length > 0 && (
        <div>
          <h2>Expenses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>id of item</th>
                <th>Category</th>
                <th>Sum</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.sum}</td>
                  <td>{item.description}</td>
                  <td>{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reports;
