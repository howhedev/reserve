import React from "react";
import "./App.css";
import Customers from "./components/Customers";
import Reservations from "./components/Reservations";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Reservations />
        <Customers />
      </div>
    </div>
  );
}

export default App;
