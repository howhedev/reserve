import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer, removeCustomer } from "../features/customerSlice";
import "./Customers.css";

interface CustomerCardType {
  id: string;
  index: number;
  name: string;
  tableNumber: number;
  food: string[];
}

interface IndividualItem {
  name: string;
  price: number;
}

const FOOD_ARRAY: IndividualItem[] = [
  { name: "pivo", price: 1.2 },
  { name: "parky", price: 2 },
  { name: "cesnacka", price: 3.5 },
  { name: "chlieb s mastou", price: 0.5 },
];

function CustomerCard({ name, id, food, tableNumber }: CustomerCardType) {
  const [customerFoodInput, setCustomerFoodInput] = useState("");
  const [tempPrice, setTempPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const handleAddFood = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!customerFoodInput) return;

    dispatch(
      addFoodToCustomer({
        id,
        food: customerFoodInput,
      })
    );

    setTotalPrice((current) => {
      let res = current + tempPrice;
      res = Math.round(res * 10) / 10;

      return res;
    });
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const foodPrice = value.split(" ");
    const price = +foodPrice.splice(foodPrice.length - 1);
    const food = foodPrice.join(" ");

    setCustomerFoodInput(food);
    setTempPrice(price);
  };

  return (
    <div className="customer-food-card-container">
      <div className="customer-food-card-titles">
        <div className="customer-food-card_namentable">
          <h1>{name}</h1>
          <h2 className="table-number">Table {tableNumber}</h2>
        </div>

        <h2>${totalPrice}</h2>
      </div>

      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((food) => {
            return <p>{food}</p>;
          })}
        </div>
        <div className="customer-food-input-container">
          <form onSubmit={handleAddFood}>
            <select onChange={selectChange}>
              <option selected disabled>
                Choose the food
              </option>
              {FOOD_ARRAY.map((food) => {
                return (
                  <option
                    key={FOOD_ARRAY.indexOf(food)}
                    value={food.name + " " + food.price}
                  >
                    {food.name} {food.price}$
                  </option>
                );
              })}
            </select>

            <button className="add-food-btn">ADD FOOD</button>
          </form>

          <button
            className="pay-btn"
            onClick={() => {
              dispatch(removeCustomer(id));
            }}
          >
            Paid - Thank you, Come again!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
