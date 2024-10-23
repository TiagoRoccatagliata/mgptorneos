// Register.jsx
import '../App.css';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from './axiosInstance.jsx';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const submission = (data) => {
  AxiosInstance.post(`register/`, {
    document_number: data.document_number,
    email: data.email,
    phone_number: data.phone_number,  // Asegúrate de que estás enviando el campo phone_number
    password: data.password,
  })
  .then(() => {
    navigate(`/`)
  })
  .catch((error) => {
    console.error(error);
  });
};

  return (
    <div className="myBackground">
      <form onSubmit={handleSubmit(submission)}>
        <Box className="whiteBox">
          <Box className="itemBox">
            <Box className="title">Registro</Box>
          </Box>

          {/* Documento */}
          <Box className="itemBox">
            <MyTextField
              label="Documento"
              name="document_number"
              control={control}
            />
          </Box>

          {/* Email */}
          <Box className="itemBox">
            <MyTextField
              label="Email"
              name="email"
              control={control}
            />
          </Box>

          {/* Nombre */}
          <Box className="itemBox">
            <MyTextField
              label="Nombre"
              name="name"
              control={control}
            />
          </Box>

          {/* Teléfono */}
          <Box className="itemBox">
            <MyTextField
              label="Número de Teléfono"
              name="phone_number"
              control={control}
            />
          </Box>

          {/* Contraseña */}
          <Box className="itemBox">
            <MyPassField
              label="Contraseña"
              name="password"
              control={control}
            />
          </Box>

          {/* Confirmar Contraseña */}
          <Box className="itemBox">
            <MyPassField
              label="Confirmar Contraseña"
              name="password2"
              control={control}
            />
          </Box>

          {/* Botón de registro */}
          <Box className="itemBox">
            <MyButton
              type="submit"
              label="Registrarse"
            />
          </Box>

          <Box className="itemBox">
            <Link to="/">¿Ya tienes cuenta? Inicia sesión!</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Register;