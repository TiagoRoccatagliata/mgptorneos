import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'TORNEOS', link: '/torneos' },
    { text: 'CALENDARIO', link: '/calendario' },
    { text: 'RANKING', link: '/ranking' },
    ...(token
      ? [
          { text: 'USUARIO', link: '/perfil' },
          { text: 'CERRAR SESIÓN', action: handleLogout },
        ]
      : [
          { text: 'REGISTROS', link: '/register' },
          { text: 'USUARIO', link: '/login' },
        ]),
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <Typography
        variant="h6"
        sx={{ color: '#729C68', fontFamily: 'Ubuntu, sans-serif', fontWeight: 'bold', textAlign: 'center', p: 2 }}
      >
        MGP Torneos
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) =>
          item.link ? (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.action}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2D2D2D', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
  variant="h6"
  component={Link} // Agregamos el componente Link
  to="/" // Ruta a la que redirige
  sx={{
    color: '#729C68',
    fontFamily: 'Ubuntu, sans-serif',
    fontWeight: 'bold',
    textDecoration: 'none', // Elimina el subrayado del enlace
    cursor: 'pointer',
  }}
>
  MGP Torneos
</Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: '20px' }}>
              {menuItems.map((item) =>
                item.link ? (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.link}
                    sx={{ color: 'white', fontFamily: 'Ubuntu, sans-serif' }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={item.text}
                    onClick={item.action}
                    sx={{ color: 'white', fontFamily: 'Ubuntu, sans-serif' }}
                  >
                    {item.text}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para dispositivos móviles */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en dispositivos móviles
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#2D2D2D',
            color: 'white',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}