import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/ticket_booking/HomePage';
import SearchResults from './components/ticket_booking/TicketSearchResults';
import BookingPage from './components/ticket_booking/TicketBookingPage';
import FeedbackPage from './components/ticket_booking/FeedbackPage';
import ReceiptPage from './components/ticket_booking/ReceiptPage';
import DestinationList from './components/Destination/DestinationList';
//import DestinationDetails from './components/Destination/DestinationDetails';
import AddDestination from './components/Destination/AddDestination';
import UpdateDestination from './components/Destination/UpdateDestination';
import DestinationListUser from './components/Destination/DestinationListUser';
import ReservationList from './components/Reservation/ReservationList';
import AddedReservation from './components/Reservation/AddedReservation';

import UserLogin from './components/Users/UserLogin';
import AdminLogin from './components/Users/AdminLogin';
import UserRegister from './components/Users/Register';
import AdminRegister from './components/Users/AdminRegister';
import ProfilePictureUpdate from './components/Users/ProfilePictureUpload';

import Tickets from './components/ticket_booking/TicketsFilter';
import BookedTickets from './components/ticket_booking/UserBookings';
import TicketForm from './components/ticket_booking/TicketForm';


//Tour Packages Management
import PackageManagement from './components/tour_packages/PackageManagement';
import PackageList from './components/tour_packages/PackageList';
import PackageDetails from './components/tour_packages/PackageDetails';
import UserProfilePage from './components/Users/UserProfile';

//site data
import AboutUsPage from './components/site_data/AboutUs';
import PrivacyPolicy from './components/site_data/PrivacyPolicy';
import TermsOfService from './components/site_data/TermsOfService';
import CookiePolicy from './components/tour_packages/CookiePolicy';

//ADMIN
import AdminAddRestaurantPage from './components/Restaurant/Admin/AdminAddRestaurantPage';
import AdminManageRestaurantsPage from './components/Restaurant/Admin/AdminManageRestaurantsPage';
import AvailableRestaurants from './components/Restaurant/AvailableRestaurant';
import RestaurantFood from './components/Restaurant/RestaurantFood';
import ManageReservations from './components/Restaurant/ManageReservations';

//Special Activity
import ActivityList from './components/special_activities/ActivityList';
import ActivityBooking from './components/special_activities/ActivityBooking';
import BookingConfirmation from './components/special_activities/BookingConfirmation';
import ActivityForm from './components/special_activities/ActivityForm';


function App() {
  return (
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
            <Route path="/addedreservations" element={<AddedReservation />} /> 


      {/* User and Admin Authentication routes */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/profile-update" element={<ProfilePictureUpdate />} />


        <Route path="/tickets" element={<Tickets />} />
        <Route path="/booked-tickets/:id" element={<BookedTickets />} />
        <Route path="/add-tickets" element={<TicketForm />} />

        <Route path="/package-manager" element={<PackageManagement />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetails />} />


        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />


        <Route path="/search-restaurants" element={<AvailableRestaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantFood />} />
        <Route path="/restaurant-reservations" element={<ManageReservations />} />

        {/*Special Activity*/}
        <Route path="/activity-list" element={<ActivityList />} />
        <Route path="/activity/:id" element={<ActivityBooking />} />
        <Route path="/add-activity" element={<ActivityForm />} />
        <Route path="/book-confirmation" element={<BookingConfirmation />} />


        <Route path="/booking/:id" element={<ActivityBooking />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />


        {/*
        <Route path="*" />*/}
        {/*ADMIN Routes */}
        <Route path="/add-restaurants" element={<AdminAddRestaurantPage />} />
        <Route path="/manage-restaurants" element={<AdminManageRestaurantsPage />} />
            
      </Routes>
  );
}

export default App;
