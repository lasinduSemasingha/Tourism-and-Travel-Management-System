import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/TicketSearchResults';
import BookingPage from './components/TicketBookingPage';
import FeedbackPage from './components/FeedbackPage';
import ReceiptPage from './components/ReceiptPage';
import DestinationList from './components/Destination/DestinationList';
//import DestinationDetails from './components/Destination/DestinationDetails';
import AddDestination from './components/Destination/AddDestination';
import UpdateDestination from './components/Destination/UpdateDestination';
import DestinationListUser from './components/Destination/DestinationListUser';
import ReservationList from './components/Reservation/ReservationList';

import UserLogin from './components/Users/UserLogin';
import AdminLogin from './components/Users/AdminLogin';
import UserRegister from './components/Users/Register';
import AdminRegister from './components/Users/AdminRegister';


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
            <Route path="/destination/update/:id" element={<UpdateDestination />} />
            <Route path="/destinationuser" element={<DestinationListUser />} />
            <Route path="/ReservationList" element={<ReservationList />} />


                    {/* User and Admin Authentication routes */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
            
      </Routes>
    </Router>
  );
}

export default App;
