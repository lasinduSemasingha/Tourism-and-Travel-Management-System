import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Alert, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { FileDownload, PictureAsPdf, Cancel, Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[10],
  },
  marginBottom: theme.spacing(2),
  height: '250px', // Set a fixed height for cards
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}`);
          setBookings(response.data);
          setFilteredBookings(response.data);
        } else {
          setError('User is not authenticated');
        }
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  useEffect(() => {
    // Filter bookings based on search query
    setFilteredBookings(
      bookings.filter((booking) =>
        booking.ticketId?.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.ticketId?.arrival.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, bookings]);

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings.map((booking) => ({
      Departure: booking.ticketId?.departure || 'N/A',
      Arrival: booking.ticketId?.arrival || 'N/A',
      'Travel Date': new Date(booking.bookingDate).toLocaleDateString(),
      'Number of Passengers': booking.noOfPassengers,
      'Total Amount': booking.totalAmount
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, 'Bookings.xlsx');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Departure', 'Arrival', 'Travel Date', 'Number of Passengers', 'Total Amount']],
      body: filteredBookings.map((booking) => [
        booking.ticketId?.departure || 'N/A',
        booking.ticketId?.arrival || 'N/A',
        new Date(booking.bookingDate).toLocaleDateString(),
        booking.noOfPassengers,
        booking.totalAmount
      ])
    });
    doc.save('Bookings.pdf'); 
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      setFilteredBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      setError('Error canceling booking');
    }
  };

  const handleUpdateBooking = async () => {
    console.log('Updating booking with data:', updatedBooking);
    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${selectedBooking._id}`, updatedBooking);
      console.log('Update response:', response.data);
  
      // Update local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === selectedBooking._id ? { ...booking, ...updatedBooking } : booking
        )
      );
      setFilteredBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === selectedBooking._id ? { ...booking, ...updatedBooking } : booking
        )
      );
      setOpenModal(false);
      setSelectedBooking(null);
      setUpdatedBooking({});
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Error updating booking');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setUpdatedBooking({
      departure: booking.ticketId?.departure || '',
      arrival: booking.ticketId?.arrival || '',
      travelDate: booking.bookingDate || '',
      noOfPassengers: booking.noOfPassengers || '',
      totalAmount: booking.totalAmount || ''
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBooking(null);
    setUpdatedBooking({});
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        My Bookings
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownload />}
          onClick={handleExportToExcel}
          style={{ marginRight: '1rem' }}
        >
          Export to Excel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdf />}
          onClick={handleExportToPDF}
        >
          Export to PDF
        </Button>
      </Box>
      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search by Departure or Arrival"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          style={{ width: '100%', maxWidth: '600px' }}
        />
      </Box>
      {filteredBookings.length === 0 ? (
        <Typography variant="h6" align="center">
          No bookings found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="body1">Departure: {booking.ticketId?.departure || 'N/A'}</Typography>
                  <Typography variant="body1">Arrival: {booking.ticketId?.arrival || 'N/A'}</Typography>
                  <Typography variant="body1">Travel Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                  <Typography variant="body1">Number of Passengers: {booking.noOfPassengers}</Typography>
                  <Typography variant="body1">Total Amount: ${booking.totalAmount}</Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => handleOpenModal(booking)}
                    >
                      Update
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for updating booking */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Departure"
            fullWidth
            margin="dense"
            value={updatedBooking.departure}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, departure: e.target.value })}
            disabled
          />
          <TextField
            label="Arrival"
            fullWidth
            margin="dense"
            value={updatedBooking.arrival}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, arrival: e.target.value })}
            disabled
          />
          <TextField
            label="Travel Date"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={updatedBooking.travelDate ? formatDate(updatedBooking.travelDate) : ''}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, travelDate: e.target.value })}
            disabled
          />
          <TextField
            label="Number of Passengers"
            fullWidth
            margin="dense"
            type="number"
            value={updatedBooking.noOfPassengers}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, noOfPassengers: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBooking} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserBookings;
