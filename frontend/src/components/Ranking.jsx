import React, { useState, useEffect } from 'react';
import AxiosInstance from './axiosInstance';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
  AxiosInstance.get('/api/rankings/')
    .then((response) => {
      setPlayers(response.data);
    })
    .catch((error) => {
      console.error('Error fetching rankings:', error);
    });
}, []);

  // Categorías únicas para el filtro
  const categories = ['Todos', ...new Set(rankings.map((player) => player.category))];

  // Filtrar rankings por categoría seleccionada
  const filteredRankings =
    selectedCategory === 'Todos'
      ? rankings
      : rankings.filter((player) => player.category === selectedCategory);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom color="white">
        Ranking de Jugadores
      </Typography>

      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ backgroundColor: '#2D2D2D', color: 'white', width: '200px', borderRadius: '4px' }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Table sx={{ backgroundColor: '#2D2D2D', color: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Posición</TableCell>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Categoría</TableCell>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Jugados</TableCell>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Ganados</TableCell>
            <TableCell sx={{ color: '#729C68', fontWeight: 'bold' }}>Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRankings.map((player, index) => (
            <TableRow key={player.id}>
              <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
              <TableCell sx={{ color: 'white' }}>{player.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{player.category}</TableCell>
              <TableCell sx={{ color: 'white' }}>{player.matchesPlayed}</TableCell>
              <TableCell sx={{ color: 'white' }}>{player.matchesWon}</TableCell>
              <TableCell sx={{ color: 'white' }}>{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Ranking;