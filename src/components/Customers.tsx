import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import CustomerCard from "./CustomerCard";
import "./Customers.css";

const Customers = () => {
  const customers = useSelector((state: RootState) => state.customers.value);

  return (
    <div className="customer-food-container">
      <h2 className="customers-header">Tables {customers.length}/6</h2>
      {customers.map((customer) => {
        return (
          <CustomerCard
            name={customer.name}
            id={customer.id}
            key={customer.id}
            tableNumber={customer.tableNumber}
            index={customers.indexOf(customer)}
            food={customer.food}
          />
        );
      })}
    </div>
  );
};

export default Customers;
