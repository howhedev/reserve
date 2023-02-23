import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeReservation } from "../features/reservationSlice";
import "./Reservations.css";
import TableModal from "./TableModal";

interface ReservationCardTypes {
  name: string;
  index: number;
  NUMBER_OF_TABLES: number;
}
function ReservationCard({
  name,
  index,
  NUMBER_OF_TABLES,
}: ReservationCardTypes) {
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="reservation-card-container">
      <div className="reservation-card-name">{name}</div>

      <div className="reservation-card-btns">
        <button
          className="reservation-card-remove-btn"
          onClick={() => {
            dispatch(removeReservation(index));
          }}
        >
          X
        </button>

        <button
          className="reservation-card-reserve-btn"
          onClick={() => {
            setTableModalOpen(true);
          }}
        >
          Have a seat!
        </button>
      </div>

      {tableModalOpen && (
        <TableModal
          NUMBER_OF_TABLES={NUMBER_OF_TABLES}
          setOpenModal={setTableModalOpen}
          name={name}
          index={index}
        />
      )}
    </div>
  );
}

export default ReservationCard;
