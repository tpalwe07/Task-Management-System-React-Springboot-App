import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        Task Management System
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.displayName = 'Header';
export default Header;
