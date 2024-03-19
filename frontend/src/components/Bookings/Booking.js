import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, Typography, TextField, MenuItem } from '@mui/material';
import SeatSelection from './SeatSelection';

const Booking = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' }
  ]);
  const [theaters, setTheaters] = useState([
    { id: 1, name: 'Theater 1' },
    { id: 2, name: 'Theater 2' },
    { id: 3, name: 'Theater 3' }
  ]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [date, setDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatBookedPopupOpen, setSeatBookedPopupOpen] = useState(false);
  const [seatUnavailablePopupOpen, setSeatUnavailablePopupOpen] = useState(false);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // Track selection completion

  // Sample booked seats data
  const sampleBookedSeats = ['A1', 'B2', 'C3'];

  useEffect(() => {
    // Simulated API calls to fetch movies, theaters, and booked seats
    // Replace these with actual API calls
    // axios.get('/api/movies')
    //   .then(response => {
    //     setMovies(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching movies:', error);
    //   });
    // axios.get('/api/theaters')
    //   .then(response => {
    //     setTheaters(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching theaters:', error);
    //   });
    // axios.get('/api/booked-seats')
    //   .then(response => {
    //     setBookedSeats(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching booked seats:', error);
    //   });

    // Use sample data for demonstration
    setBookedSeats(sampleBookedSeats);
  }, []);

  const handleBook = () => {
    if (selectedMovie && selectedTheater && date) {
      setIsSelectionComplete(true); // Mark selection as complete
      setSeatBookedPopupOpen(true);
    }
  };

  const handleSeatBookedPopupClose = () => {
    setSeatBookedPopupOpen(false);
  };
  
  const handleConfirmBooking = () => {
    // Logic for confirming booking
  };
  
  const handleSeatUnavailablePopupClose = () => {
    setSeatUnavailablePopupOpen(false);
  };

  // Other functions remain the same

  return (
    <Box>
      <Typography variant="h4" align='center' margin={2}>
        Book Tickets
      </Typography>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" margin={2}>
        <TextField
          select
          label="Select Movie"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        >
          {movies.map(movie => (
            <MenuItem key={movie.id} value={movie.title}>{movie.title}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Theater"
          value={selectedTheater}
          onChange={(e) => setSelectedTheater(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        >
          {theaters.map(theater => (
            <MenuItem key={theater.id} value={theater.name}>{theater.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          type="date"
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleBook}>Select Seats</Button>
      </Box>
      {isSelectionComplete && <SeatSelection onBook={handleBook} bookedSeats={bookedSeats} />}
      {/* Seat Booked Popup */}
      <Dialog open={seatBookedPopupOpen} onClose={handleSeatBookedPopupClose}>
        <Box margin={4}>
          <Typography variant='h5' padding={1}>Seat Booked</Typography>
          <Typography variant='body1' padding={1}>Your seats have been successfully booked!</Typography>
          <Button onClick={handleConfirmBooking} variant='outlined' color='secondary' sx={{ borderRadius: 2, margin: 1 }}>Close</Button>
        </Box>
      </Dialog>
      {/* Seat Unavailable Popup */}
      <Dialog open={seatUnavailablePopupOpen} onClose={handleSeatUnavailablePopupClose}>
        <Box margin={4}>
          <Typography variant='h5' padding={1}>Seat Unavailable</Typography>
          <Typography variant='body1' padding={1}>Sorry, the selected seat(s) is/are already booked. Please choose another seat(s).</Typography>
          <Button onClick={handleSeatUnavailablePopupClose} variant='outlined' color='secondary' sx={{ borderRadius: 2, margin: 1 }}>Close</Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default Booking;
