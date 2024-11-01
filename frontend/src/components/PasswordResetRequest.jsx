import '../App.css';
import { useState } from "react";
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import AxiosInstance from "./axiosInstance.jsx";
import MyMessage from "./Message.jsx";


const PasswordResetRequest = () => {

    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();

    const [ShowMessage, setShowMessage] = useState(false)

   const submission = (data) => {
  AxiosInstance.post(`api/password_reset/`, {
    email: data.email,
  })
  .then((response) => {
    setShowMessage(true)
  })
  .catch((error) => {
    console.error(error); // Añade aquí un log para ver el detalle del error
  });
};

  return (
      <div className="myBackground">

          {ShowMessage ? <MyMessage text={"Recibiras un email con instrucciones para resetear la contrasena! "} /> : null}
          <form onSubmit={handleSubmit(submission)}>



              <Box className="whiteBox">
                  <Box className="itemBox">
                      <Box className="title">Resetear Contraseña</Box>
                  </Box>
                  <Box className="itemBox">
                      <MyTextField
                          label="Email"
                          name={"email"}
                          control={control}
                      />
                  </Box>

                  <Box className="itemBox">
                      <MyButton
                          label="Resetear Contraseña"
                          type="submit"
                      />
                  </Box>
                  <Box className="itemBox" sx={{flexDirection: 'column'}}>
                  </Box>
              </Box>
          </form>
      </div>
  );
}

export default PasswordResetRequest