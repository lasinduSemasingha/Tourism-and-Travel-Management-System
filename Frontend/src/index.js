import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layout/Layout';

ReactDOM.render(
  <AuthProvider>
    <Layout />
  </AuthProvider>,
  document.getElementById('root')
);