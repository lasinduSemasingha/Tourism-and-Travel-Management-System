import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const TicketBookingPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      console.log('Fetching ticket with ID:', id); // Log the ID
      try {
        const response = await axios.get(`http://localhost:5000/api/tickets/${id}`);
        setTicket(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.response ? err.response.data : err.message);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [id]);
  
  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        ticketId: id,
        numOfPassengers,
        date,
        totalAmount,
      });
      // Handle booking confirmation
    } catch (err) {
      console.log("Error booking ticket");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!ticket) return <div>No ticket found</div>;

  return (
    <div>
      <Typography>Departure: {ticket.departure}</Typography>
      <Typography>Arrival: {ticket.arrival}</Typography>
      <Typography>Last Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
      <Typography>Price per Seat: ${ticket.price}</Typography>
      <TextField
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br /><br />
      <TextField 
        label="Number of Passengers" 
        type="number" 
        value={numOfPassengers} 
        onChange={(e) => setNumOfPassengers(e.target.value)} 
      />
      <TextField 
        label="Total Amount" 
        type="number" 
        value={totalAmount} 
        onChange={(e) => setTotalAmount(e.target.value)} 
      />
      <Button onClick={handleBooking}>Confirm Booking</Button>
    </div>
  );
};

export default TicketBookingPage;
