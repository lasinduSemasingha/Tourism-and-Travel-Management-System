import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header/Header';
import '../css/layout.css'
import App from '../App';
import { AuthProvider } from '.././contexts/AuthContext'; // Import the AuthProvider
import Footer from './footer/Footer';

function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Header /><br /><br /><br /><br />
        <App /><br /><br /><br />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default Layout;

