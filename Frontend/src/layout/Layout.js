import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header/Header';
import App from '../App';
import '../css/layout.css'
import { AuthProvider } from '.././contexts/AuthContext'; // Import the AuthProvider

function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <App />
      </Router>
    </AuthProvider>
  );
}

export default Layout;

