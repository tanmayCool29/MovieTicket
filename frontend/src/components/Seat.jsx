import React from "react";

const Seat = ({ seatNumber, isBooked, onClick }) => {
  const seatStyle = {
    background: isBooked ? "red" : "green",
    color: "white",
    padding: "5px",
    margin: "5px",
    cursor: isBooked ? "not-allowed" : "pointer",
  };

  return (
    <div style={seatStyle} onClick={onClick}>
      {seatNumber}
    </div>
  );
};

export default Seat;
