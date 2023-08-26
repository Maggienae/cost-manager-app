/* Eden Bar 209037571
   Maggie Nae 208612234
*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNewItem from "./AddNewItem";
import Reports from "./Reports";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<AddNewItem />} />
          <Route exact path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
