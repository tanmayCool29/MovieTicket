import React from "react";
import { Link } from "react-router-dom";

const Theaters = ({ theaters, setTheater }) => (
  <div>
    <h1>Available theaters</h1>
    <ul>
      {theaters.map((theater) => (
        <li key={theater.id}>
          <Link to="/theaters/theater">
            <button onClick={() => setTheater(theater)}>{theater.name}</button>
          </Link>
          {/* <h4>{theater.id}</h4>
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
          </form> */}
        </li>
      ))}
    </ul>
    <h2>
      <a href="/booking_details">View Bookings</a>
    </h2>
  </div>
);

export default Theaters;
