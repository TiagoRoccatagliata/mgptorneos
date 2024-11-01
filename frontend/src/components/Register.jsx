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
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

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

  const { handleSubmit, control } = useForm({resolver: yupResolver(schema)});

  const submission = (data) => {
  AxiosInstance.post(`register/`, {
    document_number: data.document_number,
    email: data.email,
    phone_number: data.phone_number,
    password: data.password,
  })
  .then(() => {
    navigate(`/`);
  })
  .catch((error) => {
    if (error.response && error.response.status === 400) {
      // Verifica si el error es de documento duplicado
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