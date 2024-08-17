import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment
} from '@mui/material';
import { CalendarToday, People, AttachMoney, CreditCard, DateRange } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TicketBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState('');
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [previousPrice, setPreviousPrice] = useState('');
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
        setError('Error fetching ticket data');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  useEffect(() => {
    if (ticket && numOfPassengers) {
      const price = numOfPassengers * ticket.price;
      setPreviousPrice(price);
      const discountedAmount = price - (price * discountPercentage / 100);
      setTotalAmount(discountedAmount);
    } else {
      setTotalAmount('');
    }
  }, [numOfPassengers, ticket, discountPercentage]);

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
    if (!userID) {
      setError('You must login to book a ticket');
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Redirect after 2 seconds
      return;
    }

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
      doc.setFontSize(22);
      doc.setFont("Helvetica", "bold");
      doc.text('Travel Sphere', 105, 20, { align: 'center' });

      const margin = 10;
      const width = 190;
      const height = 130;
      doc.setLineWidth(1);
      doc.rect(margin, 30, width, height);

      doc.setFontSize(12);
      doc.setFont("Helvetica", "normal");

      const lineHeight = 10;
      let y = 40;
      const centerX = margin + width / 2;

      doc.text(`Ticket ID: ${id}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Number of Passengers: ${numOfPassengers}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Previous Price: $${previousPrice}`, centerX, y, { align: 'center' });
      y += lineHeight;
      doc.text(`Discount Applied: ${discountPercentage}%`, centerX, y, { align: 'center' });
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

  const handleApplyDiscount = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/discount-codes/${discountCode}`);
      if (response.data) {
        setDiscountPercentage(response.data.percentage);
        //alert('Discount applied!');
      } else {
        alert('Invalid discount code.');
      }
    } catch (err) {
      alert('Error applying discount code.');
    }
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
                  <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <People color="primary" /> Number of Passengers
                  </Typography>
                  <TextField
                    type="number"
                    value={numOfPassengers}
                    onChange={(e) => setNumOfPassengers(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">x</InputAdornment>,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AttachMoney color="primary" /> Discount Code
                  </Typography>
                  <TextField
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="contained" color="primary" onClick={handleApplyDiscount}>
                            Apply
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AttachMoney color="primary" /> Price Details
                  </Typography>
                  <Typography variant="body1">Previous Price: ${previousPrice}</Typography>
                  <Typography variant="body1">Discount Applied: {discountPercentage}%</Typography>
                  <Typography variant="h6">Total Amount: ${totalAmount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
            onClick={handleBooking}
          >
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>

      <Dialog open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            value={cardDetails.cardNumber}
            onChange={handleCardNumberChange}
            margin="normal"
            InputProps={{ startAdornment: <InputAdornment position="start"><CreditCard /></InputAdornment> }}
          />
          <TextField
            label="Expiry Date (MM/YY)"
            variant="outlined"
            fullWidth
            value={cardDetails.expiryDate}
            onChange={handleExpiryDateChange}
            margin="normal"
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            value={cardDetails.cvv}
            onChange={handleCVVChange}
            margin="normal"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            color="primary"
            disabled={!isCardValid}
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketBookingPage;
