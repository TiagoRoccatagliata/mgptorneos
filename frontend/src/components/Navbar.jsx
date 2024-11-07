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
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
import AxiosInstance from './axiosInstance';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

export default function Navbar({ content, userRole }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    AxiosInstance.post('logoutall/')
      .then(() => {
        localStorage.removeItem('Token');
        navigate('/');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // Función para manejar el menú móvil
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem key="logo">
          <Typography variant="h6" sx={{ color: '#729C68', fontFamily: 'Ubuntu, sans-serif', marginLeft: '16px' }}>
            Gestión de Torneos
          </Typography>
        </ListItem>
        <Divider sx={{ backgroundColor: '#729C68' }} />
        {[
          { text: 'Inicio', icon: <HomeIcon />, link: '/home' },
          { text: 'Torneos', icon: <SportsEsportsIcon />, link: '/torneos' },
          { text: 'Calendario', icon: <CalendarTodayIcon />, link: '/calendario' },
          { text: 'Ranking', icon: <LeaderboardIcon />, link: '/ranking' },
          { text: 'Perfil', icon: <PersonIcon />, link: '/perfil' },
          { text: 'Iniciar Sesión', icon: <LoginIcon />, link: '/login' },
          { text: 'Registrarse', icon: <HowToRegIcon />, link: '/register' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link} sx={{ color: 'white' }}>
              <ListItemIcon sx={{ color: '#729C68' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ backgroundColor: '#729C68' }} />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: '#729C68' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
        {userRole === 'club' && (
          <>
            <Divider sx={{ backgroundColor: '#729C68' }} />
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/crear-torneo" sx={{ color: 'white' }}>
                  <ListItemIcon sx={{ color: '#729C68' }}><SportsEsportsIcon /></ListItemIcon>
                  <ListItemText primary="Crear Torneo" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', fontFamily: 'Ubuntu, sans-serif' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#2D2D2D',
          fontFamily: 'Ubuntu, sans-serif',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ color: '#729C68', fontFamily: 'Ubuntu, sans-serif' }}>
            Gestión de Torneos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2D2D2D',
            color: 'white',
            borderRight: '1px solid #444' // Línea divisoria
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#2D2D2D', minHeight: '100vh' }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}