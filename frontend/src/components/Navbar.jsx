import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AxiosInstance from './axiosInstance'; // Import AxiosInstance

const drawerWidth = 240;

export default function Navbar({ content, userRole }) {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    AxiosInstance.post('logoutall/')
      .then(() => {
        localStorage.removeItem('Token'); // Eliminar el token de localStorage
        navigate('/'); // Redirigir a la página de inicio de sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, link: '/home' },
    { text: 'Torneos', icon: <SportsEsportsIcon />, link: '/torneos' },
    { text: 'Calendario', icon: <CalendarTodayIcon />, link: '/calendario' },
    { text: 'Ranking', icon: <LeaderboardIcon />, link: '/ranking' },
    { text: 'Perfil', icon: <PersonIcon />, link: '/perfil' },
    { text: 'Acerca de', icon: <InfoIcon />, link: '/about' },
    { text: 'Iniciar Sesión', icon: <LoginIcon />, link: '/login' },
    { text: 'Registrarse', icon: <HowToRegIcon />, link: '/register' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Gestión de Torneos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </List>
          {userRole === 'club' && (
            <>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/crear-torneo">
                    <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
                    <ListItemText primary="Crear Torneo" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}