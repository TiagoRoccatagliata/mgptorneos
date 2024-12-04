// Torneos.js
import React, { useEffect, useState } from 'react';
import AxiosInstance from './axiosInstance';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import TournamentCard from './TournamentCard';
import { styled } from '@mui/material/styles';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';// Agrega más imágenes si las tienes

// Arreglo de imágenes
const images = [img1, img2, img3, img4, img5, img6];

const getRandomImage = () => {
  // Función para obtener una imagen aleatoria del arreglo
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

// Estilos personalizados para el modal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2D2D2D', // Fondo oscuro
    color: 'white',             // Texto en blanco
    padding: theme.spacing(2),
    borderRadius: '10px',
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  color: '#729C68', // Verde primario del título
  fontSize: '1.5rem',
});

const StyledButton = styled(Button)({
  backgroundColor: '#729C68',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5C8755',
  },
});


const Torneos = () => {
  const [tournaments, setTournaments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    AxiosInstance.get('/api/tournaments/')
      .then(response => {
        setTournaments(response.data);
      })
      .catch(error => {
        console.error("Error fetching tournaments:", error);
      });
  }, []);

  const handleOpen = (tournament) => {
    setSelectedTournament(tournament);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTournament(null);
  };

  const handleRegister = () => {
    console.log(`Registrando en el torneo ${selectedTournament.name}`);
    handleClose();
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" color="white" align="center" gutterBottom>
        MGP Torneos: ¡Descubre los Torneos que Organizamos!
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {tournaments.map(tournament => (
          <TournamentCard
            key={tournament.id}
            image={getRandomImage()}
            name={tournament.name}
            organizer={tournament.organizer || 'MGP Torneos'}
            type={tournament.type}
            players={tournament.players || 'N/A'}
            createdDate={tournament.createdDate}
            onView={() => handleOpen(tournament)}
          />
        ))}
      </Box>

      {/* Modal para mostrar detalles del torneo */}
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <StyledDialogTitle>{selectedTournament?.name}</StyledDialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom color="#729C68">
            Organizado por: {selectedTournament?.organizer || 'MGP Torneos'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tipo: {selectedTournament?.type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Jugadores: {selectedTournament?.players || 'N/A'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Creado: {selectedTournament?.createdDate}
          </Typography>
          <Divider sx={{ marginY: 2, backgroundColor: '#729C68' }} />
          <Typography variant="body1" gutterBottom>
            Descripción: {selectedTournament?.description || 'No hay descripción disponible.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#EC5A76' }}>
            Cerrar
          </Button>
          <StyledButton onClick={handleRegister}>
            Inscribirse
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default Torneos;