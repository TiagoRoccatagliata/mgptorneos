
import '../App.css';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="myBackground">
      <Box className="whiteBox">
        <Box className="itemBox">
          <Box className="title">Inicio de Sesión</Box>
        </Box>
        <Box className="itemBox">
          <MyTextField label="Documento" />
        </Box>
        <Box className="itemBox">
          <MyPassField label="Contraseña" />
        </Box>
        <Box className="itemBox">
          <MyButton label="Iniciar Sesión" />
        </Box>
        <Box className="itemBox">
          <Link to="/register">¿Sin cuenta? Regístrate Gratis!</Link>
        </Box>
      </Box>
    </div>
  );
};

export default Login;