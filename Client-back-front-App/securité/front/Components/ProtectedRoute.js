import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Ici, vous devriez vérifier l'état d'authentification de l'utilisateur
  // Par exemple, en vérifiant un token dans le localStorage
  return localStorage.getItem('authenticated') === 'true';
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
