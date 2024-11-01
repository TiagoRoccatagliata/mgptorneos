
import '../App.css';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import AxiosInstance from "./axiosInstance.jsx";

const Login = () => {
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();

const submission = (data) => {
  AxiosInstance.post(`login/`, {
    document_number: data.document_number,
    password: data.password,  // Asegúrate de incluir el campo password aquí
  })
  .then((response) => {
    console.log(response)
    localStorage.setItem('Token', response.data.token)
    navigate('/home')
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
              <Box className="title">Inicio de Sesión</Box>
            </Box>
            <Box className="itemBox">
              <MyTextField
                  label="Documento"
                  name={"document_number"}
                  control={control}
              />
            </Box>
            <Box className="itemBox">
              <MyPassField
                label="Contraseña"
                name={"password"}
                control={control}
              />
</Box>
            <Box className="itemBox">
              <MyButton
                  label="Iniciar Sesión"
                  type="submit"
              />
            </Box>
            <Box className="itemBox" sx={{flexDirection:'column'}}>
              <Link to="/register">¿Sin cuenta? Regístrate Gratis!</Link>
                <Link to="/request/password_reset">Olvidaste la Contraseña?</Link>
            </Box>
          </Box>
        </form>
      </div>
);
};

export default Login;