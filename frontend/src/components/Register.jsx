import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function RegisterPage() {
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Aquí puedes implementar la lógica para el registro de usuarios con tu backend.
    console.log('Registrarse con:', { documentNumber, email, password, confirmPassword });
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', textAlign: 'center', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Registrarse
      </Typography>
      <TextField
        label="Número de Documento"
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirmar Contraseña"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        fullWidth
      >
        Registrarse
      </Button>
    </Box>
  );
}