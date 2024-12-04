import React from 'react';
import ProtectedRoute from './ProtectedRoutes.jsx';

const Perfil = () => {
  return (
    <ProtectedRoute>
      <div style={{ color: 'white' }}>
        <h1>Mi Perfil</h1>
        <p>Información del usuario...</p>
      </div>
    </ProtectedRoute>
  );
};

export default Perfil;