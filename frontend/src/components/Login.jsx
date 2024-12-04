import * as React from 'react';
import { useState } from 'react';
import { Box, Button, CssBaseline, Divider, FormControl, FormLabel, Link, TextField, Typography, Stack, Checkbox, FormControlLabel } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import AxiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
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
  backgroundColor: '#2D2D2D', // Fondo oscuro similar al Home
  color: 'white', // Texto en blanco para mejor contraste
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: '#1F1F1F', // Fondo del contenedor de inicio de sesión
}));

const StyledButton = styled(Button)({
  backgroundColor: '#729C68', // Verde primario
  color: 'white',
  '&:hover': {
    backgroundColor: '#5C8755', // Color más oscuro al hacer hover
  },
});

export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false); // Aquí está la importación de useState

  const submission = (data) => {
    AxiosInstance.post('/api/auth/login/', {
      document_number: data.document_number,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem('Token', response.data.token);
      navigate('/home');
    })
    .catch((error) => {
      setShowMessage(true);
      console.error('Error durante el inicio de sesión', error);
    });
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
      <CssBaseline />
      {showMessage && <MyMessage text="El Inicio de Sesión Falló, Por favor reinténtelo." color="#EC5A76" />}
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Inicio de Sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submission)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="document_number" sx={{ color: '#729C68' }}>Documento</FormLabel>
            <TextField
              id="document_number"
              name="document_number"
              placeholder="Tu documento"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("document_number")}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password" sx={{ color: '#729C68' }}>Contraseña</FormLabel>
              <Link href="/request/password_reset" variant="body2" sx={{ color: '#729C68' }}>
                ¿Olvidaste la Contraseña?
              </Link>
            </Box>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("password")}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
            sx={{ color: 'white' }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Iniciar Sesión
          </StyledButton>
          <Typography sx={{ textAlign: 'center', color: 'white' }}>
            ¿No tienes cuenta?{' '}
            <Link href="/register" variant="body2" sx={{ color: '#729C68' }}>
              Regístrate Gratis
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}