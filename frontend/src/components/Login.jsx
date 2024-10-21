import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  const [documentNumber, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica para el inicio de sesión con tu backend.
    console.log('Iniciar sesión con:', { documentNumber, password });
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', textAlign: 'center', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Número de Documento"
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
}