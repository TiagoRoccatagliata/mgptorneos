// TournamentCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 345,
  backgroundColor: '#2D2D2D',
  color: 'white',
  margin: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

const ViewButton = styled(Button)({
  backgroundColor: '#729C68',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5C8755',
  },
  marginTop: '10px',
});

const TournamentCard = ({ image, name, organizer, type, players, createdDate, onView }) => (
  <StyledCard>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={`Imagen de ${name}`}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="white">
        Organizado por: {organizer}
      </Typography>
      <Typography variant="body2" color="white">
        Tipo: {type}
      </Typography>
      <Typography variant="body2" color="white">
        Jugadores: {players}
      </Typography>
      <Typography variant="body2" color="white">
        Creado: {createdDate}
      </Typography>
      <ViewButton variant="contained" fullWidth onClick={onView}>
        Ver Torneo
      </ViewButton>
    </CardContent>
  </StyledCard>
);

export default TournamentCard;