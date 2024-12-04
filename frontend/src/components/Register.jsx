import * as React from 'react';
import { Box, Typography, Button, FormControl, FormLabel, TextField, Link, Divider } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './axiosInstance';
import * as yup from 'yup';

// Estilos personalizados
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

const SignUpContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
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

const Register = () => {
  const navigate = useNavigate();

  // Esquema de validación Yup
  const schema = yup.object({
    document_number: yup
      .string()
      .matches(/^[0-9]+$/, "El campo solo debe contener números")
      .required('El Número de Documento es obligatorio'),
    email: yup
      .string()
      .email('Ingresa un correo electrónico válido')
      .required('El Email es obligatorio'),
    name: yup
      .string()
      .min(3, 'El Nombre debe tener al menos 3 caracteres')
      .required('El Nombre es obligatorio'),
    phone_number: yup
      .string()
      .matches(/^[0-9]+$/, "El Número de Teléfono solo debe contener números")
      .min(10, 'El Número de Teléfono debe tener al menos 10 dígitos')
      .required('El Número de Teléfono es obligatorio'),
    password: yup
      .string()
      .min(8, 'La Contraseña debe tener al menos 8 caracteres')
      .required('La Contraseña es obligatoria'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('La Confirmación de Contraseña es obligatoria')
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });

const submission = (data) => {
    AxiosInstance.post('/api/auth/register/', {
      document_number: data.document_number,
      email: data.email,
      name: data.name,
      phone_number: data.phone_number,
      password: data.password,
    })
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        if (error.response.data.document_number) {
          alert("El número de documento ya está registrado. Usa otro número.");
        } else {
          alert("Error al registrar el usuario.");
        }
      } else {
        console.error(error);
      }
    });
  };

  return (
    <SignUpContainer>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Registro
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

          <FormControl>
            <FormLabel htmlFor="name" sx={{ color: '#729C68' }}>Nombre</FormLabel>
            <TextField
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("name")}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone_number" sx={{ color: '#729C68' }}>Número de Teléfono</FormLabel>
            <TextField
              id="phone_number"
              name="phone_number"
              placeholder="Número de Teléfono"
              required
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: 'white' } }}
              {...control.register("phone_number")}
            />
          </FormControl>

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
              {...control.register("password")}
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
              {...control.register("password2")}
            />
          </FormControl>

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Registrarse
          </StyledButton>

          <Typography sx={{ textAlign: 'center', color: 'white' }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/" variant="body2" sx={{ color: '#729C68' }}>
              Inicia sesión
            </Link>
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#729C68' }} />
      </Card>
    </SignUpContainer>
  );
};

export default Register;