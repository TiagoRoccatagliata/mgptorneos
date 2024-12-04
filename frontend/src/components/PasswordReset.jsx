import * as React from 'react';
import { useState } from "react";
import { Box, Typography, Button, FormControl, FormLabel, TextField } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import AxiosInstance from "./axiosInstance";
import MyMessage from "./Message";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  backgroundColor: '#2D2D2D',
  color: 'white',
}));

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1F1F1F',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#729C68',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5C8755',
  },
});

const PasswordReset = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm();
  const { token } = useParams();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    })
    .then(() => {
      setShowMessage(true);
      setTimeout(() => {
        navigate('/');
      }, 6000);
    })
    .catch((error) => {
      console.error("Error during password reset", error);
    });
  };

  const validatePasswords = (value) => value === watch('password') || "Las contraseñas no coinciden";

  return (
    <Container>
      {showMessage && <MyMessage text="Tu contraseña fue restablecida exitosamente, serás redirigido!" color="#69C9AB" />}
      <Card variant="outlined">
        <Typography variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Restablecer Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submission)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: '#729C68' }}>Contraseña</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("password", { required: "La contraseña es requerida" })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password2" sx={{ color: '#729C68' }}>Confirmar Contraseña</FormLabel>
            <TextField
              id="password2"
              name="password2"
              type="password"
              placeholder="••••••"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("password2", { required: "Por favor confirma tu contraseña", validate: validatePasswords })}
            />
          </FormControl>
          <StyledButton type="submit" fullWidth variant="contained">
            Resetear Contraseña
          </StyledButton>
        </Box>
      </Card>
    </Container>
  );
}

export default PasswordReset;