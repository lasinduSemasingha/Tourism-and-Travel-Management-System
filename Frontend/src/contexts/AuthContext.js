import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state
  const [isUser, setIsUser] = useState(false); // Add isAdmin state

  useEffect(() => {
    const checkAuth = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      if (userInfo) {
        setIsAuthenticated(true);
        setUser(userInfo);
        setIsAdmin(false); // Set isAdmin to false if userInfo is present
        setIsUser(true)
      } else if (adminInfo) {
        setIsAuthenticated(true);
        setUser(adminInfo);
        setIsAdmin(true); // Set isAdmin to true if adminInfo is present
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setIsAdmin(false); // Set isAdmin to false when user logs in
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('adminInfo', JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setIsAdmin(true); // Set isAdmin to true when admin logs in
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false); // Reset isAdmin on logout
    window.location.href = '/';
  };
  const adminLogout = () => {
    localStorage.removeItem('adminInfo');
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false); // Reset isAdmin on logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isUser ,isAdmin, login, logout, adminLogout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
