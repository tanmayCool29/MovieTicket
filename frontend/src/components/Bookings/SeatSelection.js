import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const SeatSelection = ({ onBook }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber)); // Deselect seat if already selected
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]); // Select seat if not already selected
    }
  };

  const handleBookTickets = () => {
    // Pass selected seats to the parent component for booking
    onBook(selectedSeats);
  };

  return (
    <Box>
      <Typography variant="h4" align='center' margin={2}>
        Select Seats
      </Typography>
      <Box display={"flex"} justifyContent={"center"} margin={4}>
        <Box>
          <Typography variant='body1' padding={1}>Screen</Typography>
          <Box display="grid" gridTemplateColumns="repeat(10, 40px)" gap={2}>
            {Array.from({ length: 100 }, (_, index) => (
              <Button
                key={index + 1}
                variant={selectedSeats.includes(index + 1) ? "contained" : "outlined"}
                onClick={() => handleSeatClick(index + 1)}
                sx={{ margin: '2px' }} // Add margin to each seat button
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleBookTickets}>Book Tickets</Button>
      </Box>
    </Box>
  );
};

export default SeatSelection;
