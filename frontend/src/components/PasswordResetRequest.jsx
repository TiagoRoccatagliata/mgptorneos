import * as React from 'react';
import { useState } from "react";
import { Box, Typography, Button, FormControl, FormLabel, TextField } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
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

const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    })
    .then(() => {
      setShowMessage(true);
    })
    .catch((error) => {
      console.error("Error requesting password reset", error);
    });
  };

  return (
    <Container>
      {showMessage && <MyMessage text="Recibirás un email con instrucciones para resetear la contraseña!" color="#69C9AB" />}
      <Card variant="outlined">
        <Typography variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Resetear Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submission)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: '#729C68' }}>Email</FormLabel>
            <TextField
              id="email"
              name="email"
              placeholder="Correo electrónico"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("email")}
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

export default PasswordResetRequest;