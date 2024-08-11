import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Card, CardContent, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const TicketBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add this line to get the navigate function
  const [ticket, setTicket] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isCardValid, setIsCardValid] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userID = userInfo ? userInfo._id : null; // Get user ID

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tickets/${id}`);
        setTicket(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [id]);
  
  useEffect(() => {
    if (ticket && numOfPassengers) {
      setTotalAmount(numOfPassengers * ticket.price);
    } else {
      setTotalAmount('');
    }
  }, [numOfPassengers, ticket]);

  useEffect(() => {
    const validateCardDetails = () => {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      const cardNumberValid = cardNumber.length === 16; // Simple check for 16 digits
      const expiryDateValid = /^((0[1-9]|1[0-2])\/\d{2})$/.test(expiryDate); // MM/YY format
      const cvvValid = cvv.length === 3; // Simple check for 3 digits
      
      setIsCardValid(cardNumberValid && expiryDateValid && cvvValid);
    };

    validateCardDetails();
  }, [cardDetails]);

  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        ticketId: id,
        userId: userID,
        noOfPassengers: numOfPassengers,
        bookingDate: date,
        totalAmount: totalAmount,
      });
      setOpenPaymentModal(true);
    } catch (err) {
      setError('Error booking ticket');
    }
  };

  const handlePayment = async () => {
    try {
      // Replace with actual payment processing logic
      console.log('Processing payment with card details:', cardDetails);
      alert("Payment successful!");
      setOpenPaymentModal(false);
      
      // Redirect to the ticket search page
      navigate('/search');
    } catch (err) {
      setError('Error processing payment');
    }
  };

  // Format card number to limit to 16 digits
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardDetails(prev => ({ ...prev, cardNumber: value }));
  };

  // Format expiry date to MM/YY
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardDetails(prev => ({ ...prev, expiryDate: value }));
  };

  // Format CVV to limit to 3 digits
  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardDetails(prev => ({ ...prev, cvv: value }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!ticket) return <Alert severity="info">No ticket found</Alert>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Confirm Your Booking
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Departure: {ticket.departure}</Typography>
              <Typography variant="h6">Arrival: {ticket.arrival}</Typography>
              <Typography variant="h6">Last Date: {new Date(ticket.travelDate).toLocaleDateString()}</Typography>
              <Typography variant="h6">Price per Seat: ${ticket.price}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='date'
                label='Booking Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Number of Passengers"
                type="number"
                value={numOfPassengers}
                onChange={(e) => setNumOfPassengers(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Total Amount $"
                type="number"
                value={totalAmount}
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                fullWidth
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
        <DialogTitle>Enter Payment Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Card Number"
            type="text"
            value={cardDetails.cardNumber}
            onChange={handleCardNumberChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expiry Date (MM/YY)"
            type="text"
            value={cardDetails.expiryDate}
            onChange={handleExpiryDateChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="CVV"
            type="text"
            value={cardDetails.cvv}
            onChange={handleCVVChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary" disabled={!isCardValid}>
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketBookingPage;
