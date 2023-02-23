import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../app/store";
import { addCustomer } from "../features/customerSlice";
import { removeReservation } from "../features/reservationSlice";
import "./tableModal.css";

interface TableModalType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  index: number;
  NUMBER_OF_TABLES: number;
}

function TableModal({
  setOpenModal,
  name,
  index,
  NUMBER_OF_TABLES,
}: TableModalType) {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.value);

  const checkFirstFreeTable = () => {
    let result;
    let temp: number;
    for (let i = 1; i <= NUMBER_OF_TABLES; i++) {
      result = customers.find(({ tableNumber }) => tableNumber === i);
      if (!result) {
        temp = i;
        return temp;
      }
    }
  };

  const [selectedTable, setSelectedTable] = useState(
    checkFirstFreeTable() || 1
  );

  const checkAvailableTable = () => {
    var tables: JSX.Element[] = [];
    let disabled: boolean = false;
    {
      for (let i = 1; i <= NUMBER_OF_TABLES; i++) {
        customers.map((customer) => {
          customer.tableNumber === i ? (disabled = true) : false;
        });
        tables.push(
          <div>
            <div className="radio-toolbar">
              <input
                type="radio"
                id={`${i}`}
                key={i}
                name="tables"
                value={`table  ${i}`}
                disabled={disabled}
              />
              <label onClick={() => setSelectedTable(i)} htmlFor={`${i}`}>
                table {i}
              </label>
            </div>
          </div>
        );
        disabled = false;
      }

      return tables;
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Pick a free table</h1>
        </div>
        <fieldset>{checkAvailableTable()}</fieldset>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(removeReservation(index));
              dispatch(
                addCustomer({
                  id: uuid(),
                  tableNumber: selectedTable,
                  name: name,
                  food: [],
                })
              );
              setOpenModal(false);
            }}
          >
            Sit on the table {selectedTable}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableModal;
