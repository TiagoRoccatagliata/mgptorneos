import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = localStorage.getItem('Token');

  // Verifica si hay un token válido
  if (!token) {
    return <Navigate to="/" />;
  }

  // Renderiza los componentes protegidos si hay un token
  return <Outlet />;
};

export default ProtectedRoutes;