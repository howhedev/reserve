import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addReservation } from "../features/reservationSlice";
import ReservationCard from "./ReservationCard";
import "./Reservations.css";

function Reservations() {
  const [reservationName, setReservationName] = useState("");
  const [enabledReservations, setEnabledReservations] = useState(true);
  const [numberOfTables, setNumberOfTables] = useState(6);

  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  );

  const customers = useSelector((state: RootState) => state.customers.value);

  const NUMBER_OF_TABLES: number = numberOfTables;

  const dispatch = useDispatch();
  const handleAddReservation = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!reservationName) return;

    dispatch(addReservation(reservationName));
    setReservationName("");
  };

  useEffect(() => {
    if (reservations.length + customers.length === NUMBER_OF_TABLES) {
      setEnabledReservations(false);
      setReservationName("");
    } else {
      setEnabledReservations(true);
    }
  }, [reservations, customers.length]);

  return (
    <>
      <div className="reservation-container">
        <div>
          <h5 className="reservation-header">Reservations</h5>

          <div className="reservation-cards-container">
            {reservations.map((name: string, index: number) => {
              return (
                <ReservationCard
                  NUMBER_OF_TABLES={NUMBER_OF_TABLES}
                  name={name}
                  key={index}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="reservation-input-container">
          <form onSubmit={handleAddReservation}>
            <input
              placeholder="e.g. Peter Howhe"
              value={reservationName}
              onChange={(e) => {
                setReservationName(e.target.value);
              }}
            />
            {(enabledReservations && <button>Add Reservation</button>) || (
              <button disabled={true}>FULL</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Reservations;
