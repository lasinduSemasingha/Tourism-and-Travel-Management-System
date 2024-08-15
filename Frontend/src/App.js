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
import HotelOwnerRegister from './components/Users/HotelOwnerRegister';
import HotelOwnerLogin from './components/Users/HotelOwnerLogin';
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
import UserBookings from './components/special_activities/UserBookings';

import AddVehicle from './components/vehicle/AddVehicle';
import VehicleList from './components/vehicle/VehicleList';
import UpdateVehicle from './components/vehicle/UpdateVehicle';
import VehicleListUser from './components/vehicle/VehicleListUser';
import VehicleReservationList from './components/vehicle_reservation/VehicleReservationList';
import AddedVehicleReservation from './components/vehicle_reservation/AddedVehicleReservation';
import Checkout from './components/vehicle_reservation/Checkout';
import Payment from './components/vehicle_reservation/Payment';
import ReservationChart from './components/vehicle_reservation/ReservationChart';


import AddHotel from './components/hotel/AddHotel';
import UpdateHotel from './components/hotel/UpdateHotel';
import HotelList from './components/hotel/HotelList';
import HotelListUser from './components/hotel/HotelListUser';
import HotelReservationList from './components/hotel_reservation/HotelReservationList';
import AddedHotelReservations from './components/hotel_reservation/AddedHotelReservations';


import CategoryBoxes from './components/special_activities/Boxes/CategoryBoxes';
import AdminDashboard from './components/Admin/AdminDashboard';



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
        <Route path="/hotelowner/register" element={<HotelOwnerRegister />} />
        <Route path="/hotelownerlogin" element={<HotelOwnerLogin />} />
        <Route path="/profile-update" element={<ProfilePictureUpdate />} />


        <Route path="/tickets" element={<Tickets />} />
        <Route path="/booked-tickets/:id" element={<BookedTickets />} />
        <Route path="/add-tickets" element={<TicketForm />} />

        <Route path="/package-manager" element={<PackageManagement />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetails />} />


        <Route path="/vehicle/add" element={<AddVehicle />} />
        <Route path="/vehiclelist" element={<VehicleList />} />
        <Route path="/vehicle/update/:id" element={<UpdateVehicle />} />
        <Route path="/vehicleuser" element={<VehicleListUser />} />
        <Route path="/vehiclereservationlist" element={<VehicleReservationList />} />
        <Route path="/addedvehiclereservations" element={<AddedVehicleReservation />} /> 
        <Route path="/Checkout" element={<Checkout />} /> 
        <Route path="/Payment" element={<Payment />} /> 
        <Route path="/reservationchart" element={<ReservationChart />} />


        <Route path="*" />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />


        <Route path="/search-restaurants" element={<AvailableRestaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantFood />} />
        <Route path="/restaurant-reservations" element={<ManageReservations />} />

     
        <Route path="/activity-list" element={<ActivityList />} />
        <Route path="/activity/:id" element={<ActivityBooking />} />
        <Route path="/add-activity" element={<ActivityForm />} />
        <Route path="/book-confirmation" element={<BookingConfirmation />} />


        <Route path="/booking/:id" element={<ActivityBooking />} />
        <Route path="/book-confirmation/:id" element={<BookingConfirmation />} />
        <Route path="/user-bookings" element={<UserBookings />} />
        <Route path="/sports" element={<CategoryBoxes />} />


        {/*
        <Route path="" />/}
        {/*ADMIN Routes */}
        <Route path="/add-restaurants" element={<AdminAddRestaurantPage />} />
        <Route path="/admin-manage-restaurants" element={<AdminManageRestaurantsPage />} />
        <Route path="/manage-restaurants-reservations" element={<ManageReservations />} />


        <Route path="/hotel/add" element={<AddHotel />} />
        <Route path="/hotelupdate/:id" element={<UpdateHotel />} />
        <Route path="/admin/hotellist" element={<HotelList />} />
        <Route path="/hotellistuser" element={<HotelListUser />} />
        <Route path="/hotelreservationlist" element={<HotelReservationList />} />
        <Route path="/addedhotelreservations" element={<AddedHotelReservations />} />

        <Route path="/available-restaurants" element={<AvailableRestaurants />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

       
            
      </Routes>
  );
}

export default App;