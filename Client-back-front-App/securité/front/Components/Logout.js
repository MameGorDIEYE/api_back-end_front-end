import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  // Supprimez la session et redirigez vers la page d'inscription
  localStorage.removeItem('authenticated');
  return <Navigate to="/inscription" replace />;
};

export default Logout;
