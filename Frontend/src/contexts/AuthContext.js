import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      const ownerInfo = JSON.parse(localStorage.getItem('ownerInfo'));

      if (userInfo) {
        setIsAuthenticated(true);
        setUser(userInfo);
        setIsUser(true);
        setIsAdmin(false);
        setIsOwner(false);
      } else if (adminInfo) {
        setIsAuthenticated(true);
        setUser(adminInfo);
        setIsAdmin(true);
        setIsUser(false);
        setIsOwner(false);
      } else if (ownerInfo) {
        setIsAuthenticated(true);
        setUser(ownerInfo);
        setIsOwner(true);
        setIsUser(false);
        setIsAdmin(false);
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
      setIsUser(true);
      setIsAdmin(false);
      setIsOwner(false);
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
      setIsAdmin(true);
      setIsUser(false);
      setIsOwner(false);
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
    }
  };

  const ownerLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/hotelowner/login', { email, password });
      localStorage.setItem('ownerInfo', JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setIsOwner(true);
      setIsUser(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setIsUser(false);
    setIsOwner(false);
    window.location.href = '/';
  };

  const adminLogout = () => {
    localStorage.removeItem('adminInfo');
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setIsUser(false);
    setIsOwner(false);
    window.location.href = '/';
  };

  const ownerLogout = () => {
    localStorage.removeItem('ownerInfo');
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setIsUser(false);
    setIsOwner(false);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isUser, isAdmin, isOwner, login, logout, adminLogout, adminLogin, ownerLogin, ownerLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
