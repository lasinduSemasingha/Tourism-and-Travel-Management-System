import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Card, CardContent, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Divider } from '@mui/material';
import { CalendarToday, People, AttachMoney, CreditCard, DateRange, Payment } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TicketBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const userID = userInfo ? userInfo._id : null;

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
      const cardNumberValid = cardNumber.length === 16;
      const expiryDateValid = /^((0[1-9]|1[0-2])\/\d{2})$/.test(expiryDate);
      const cvvValid = cvv.length === 3;
      
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
      console.log('Processing payment with card details:', cardDetails);
  
      // Generate receipt
      const doc = new jsPDF();
      
      // Set the title
      doc.setFontSize(22);
      doc.setFont("Helvetica", "bold");
      doc.text('Travel Sphere', 105, 20, { align: 'center' });
  
      // Draw a thinner border around the receipt
      const margin = 10;
      const width = 190;
      const height = 130;
      doc.setLineWidth(1); // Reduced thickness
      doc.rect(margin, 30, width, height);
  
      // Set content font size and style
      doc.setFontSize(12);
      doc.setFont("Helvetica", "normal");
  
      // Add content with centered alignment
      const lineHeight = 10;
      let y = 40; // Starting Y position after title
      
      const centerX = margin + width / 2;
      
      doc.text(`Ticket ID: ${id}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Number of Passengers: ${numOfPassengers}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Total Amount: $${totalAmount}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Booking Date: ${date}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Departure: ${ticket.departure}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Arrival: ${ticket.arrival}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Travel Date: ${new Date(ticket.travelDate).toLocaleDateString()}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Price per Seat: $${ticket.price}`, centerX, y, { align: 'center' });
  
      doc.save('receipt.pdf');
  
      alert("Payment successful!");
      setOpenPaymentModal(false);
      
      navigate('/feedback'); // Redirect to feedback page
    } catch (err) {
      setError('Error processing payment');
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardDetails(prev => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardDetails(prev => ({ ...prev, expiryDate: value }));
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardDetails(prev => ({ ...prev, cvv: value }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!ticket) return <Alert severity="info">No ticket found</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Confirm Your Booking
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <CalendarToday color="primary" /> Departure
                  </Typography>
                  <Typography variant="body1">{ticket.departure}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <CalendarToday color="primary" /> Arrival
                  </Typography>
                  <Typography variant="body1">{ticket.arrival}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <DateRange color="primary" /> Travel Date
                  </Typography>
                  <Typography variant="body1">{new Date(ticket.travelDate).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AttachMoney color="primary" /> Price per Seat
                  </Typography>
                  <Typography variant="body1">Rs. {ticket.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Booking Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='date'
                label='Booking Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Number of Passengers"
                type="number"
                value={numOfPassengers}
                onChange={(e) => setNumOfPassengers(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <People />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Total Amount $"
                type="number"
                value={totalAmount}
                margin="normal"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Rs. 
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                fullWidth
                style={{ marginTop: '1rem' }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCard />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Expiry Date (MM/YY)"
            type="text"
            value={cardDetails.expiryDate}
            onChange={handleExpiryDateChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRange />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="CVV"
            type="text"
            value={cardDetails.cvv}
            onChange={handleCVVChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Payment />
                </InputAdornment>
              ),
            }}
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
