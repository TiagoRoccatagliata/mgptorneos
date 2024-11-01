import '../App.css';
import { useState } from "react";
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField.jsx';
import MyPassField from './forms/MyPassField.jsx';
import MyButton from './forms/MyButton.jsx';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import AxiosInstance from "./axiosInstance.jsx";
import MyMessage from "./Message.jsx";


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
        .then((response) => {
            setShowMessage(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        })
        .catch((error) => {
            console.error(error); // Log detallado para el error
        });
    };

    // Validación adicional para asegurar que las contraseñas coincidan
    const validatePasswords = (value) => {
        return value === watch('password') || "Las contraseñas no coinciden";
    };

    return (
        <div className="myBackground">
            {showMessage ? <MyMessage text={"Tu contraseña fue restablecida exitosamente, serás redirigido!"} /> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className="whiteBox">
                    <Box className="itemBox">
                        <Box className="title">Restablecer Contraseña</Box>
                    </Box>

                    <Box className="itemBox">
                        <MyPassField
                            label="Contraseña"
                            name="password"
                            control={control}
                            rules={{ required: "La contraseña es requerida" }}
                        />
                    </Box>

                    <Box className="itemBox">
                        <MyPassField
                            label="Confirmar Contraseña"
                            name="password2"
                            control={control}
                            rules={{
                                required: "Por favor confirma tu contraseña",
                                validate: validatePasswords
                            }}
                        />
                    </Box>

                    <Box className="itemBox">
                        <MyButton
                            label="Resetear Contraseña"
                            type="submit"
                        />
                    </Box>
                </Box>
            </form>
        </div>
    );
}

export default PasswordReset;