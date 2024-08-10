import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/TicketSearchResults';
import BookingPage from './components/TicketBookingPage';
import FeedbackPage from './components/FeedbackPage';
import ReceiptPage from './components/ReceiptPage';
import DestinationList from './components/Destination/DestinationList';
import DestinationDetails from './components/Destination/DestinationDetails';
import AddDestination from './components/Destination/AddDestination';
import UpdateDestination from './components/Destination/UpdateDestination';
import ReservationList from './components/Reservation/ReservationList';
import ReservationDetails from './components/Reservation/ReservationDetails';
import AddReservation from './components/Reservation/AddReservation';
import UpdateReservation from './components/Reservation/UpdateReservation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/receipt/:id" element={<ReceiptPage />} />

       //destination and reservation routes

       <Route path="/destination" element={<DestinationList />} />
            <Route path="/destination/add" element={<AddDestination />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/destination/update/:id" element={<UpdateDestination />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/reservation/add" element={<AddReservation />} />
            <Route path="/reservation/:id" element={<ReservationDetails />} />
            <Route path="/reservation/update/:id" element={<UpdateReservation />} />
            
      </Routes>
    </Router>
  );
}

export default App;
