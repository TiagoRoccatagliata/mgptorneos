
import '../App.css';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="myBackground">
      <Box className="whiteBox">
        <Box className="itemBox">
          <Box className="title">Registro</Box>
        </Box>
        <Box className="itemBox">
          <MyTextField label="Documento" />
        </Box>
        <Box className="itemBox">
          <MyTextField label="Email" />
        </Box>
        <Box className="itemBox">
          <MyTextField label="Nombre" />
        </Box>
        <Box className="itemBox">
          <MyPassField label="Contraseña" />
        </Box>
        <Box className="itemBox">
          <MyPassField label="Confirmar Contraseña" />
        </Box>
        <Box className="itemBox">
          <MyButton label="Registrarse" />
        </Box>
        <Box className="itemBox">
          <Link to="/">¿Ya tienes cuenta? Inicia sesión!</Link>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
