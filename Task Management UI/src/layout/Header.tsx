import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { COLORS } from '../theme/theme';

const Header: React.FC = () => (
  <AppBar position='static' sx={{ bgcolor: COLORS.primaryMain }}>
    <Toolbar>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        Task Management System
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.displayName = 'Header';
export default Header;
