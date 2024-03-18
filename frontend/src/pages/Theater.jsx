import React from "react";

const Theater = ({ theater }) => {
  console.log(theater);
  const renderSeats = () => {
    const seatCount = theater.seats;
    const seats = Array.from({ length: seatCount }, (_, index) => index + 1);

    return seats.map((seatNumber) => (
      <button
        key={seatNumber}
        onClick={() => handleSeatClick(seatNumber)}
        style={{
          border: "5px solid green",
          background: "white",
          color: "black",
          padding: "5px",
          margin: "5px",
          cursor: "pointer",
        }}
      >
        {seatNumber}
      </button>
    ));
  };

  return (
    <>
      <button onClick={() => setTheater(theater)}>{theater.name}</button>

      <h4>{theater.id}</h4>
      <h4>{theater.theater_venue}</h4>
      <h4>{theater.show_start_time}</h4>
      <h4>{theater.price}</h4>
      <p>Available Seats: {theater.seats}</p>
      <form action={`/book/${theater.id}`} method="POST">
        <label htmlFor="num_tickets">Number of Tickets:</label>
        <input
          type="number"
          name="num_tickets"
          id="num_tickets"
          min="1"
          max={theater.seats}
          required
        />
        <button type="submit">Book Tickets</button>
      </form>

      <div>{renderSeats()}</div>
    </>
  );
};

export default Theater;
