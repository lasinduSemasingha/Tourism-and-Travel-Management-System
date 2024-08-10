import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/TicketSearchResults';
import BookingPage from './components/TicketBookingPage';
import FeedbackPage from './components/FeedbackPage';
import ReceiptPage from './components/ReceiptPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/receipt/:id" element={<ReceiptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
