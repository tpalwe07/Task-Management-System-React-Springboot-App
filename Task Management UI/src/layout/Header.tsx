import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { COLORS } from '../theme/theme';
import Setting from './Settings';

const Header: React.FC = () => {

  return (
    <AppBar position='static' sx={{ bgcolor: COLORS.primaryMain }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task Management System
        </Typography>
        <Setting username='John Doe' />
        {/* <IconButton onClick={toggleTheme} color='inherit' aria-label='toggle theme'>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = 'Header';
export default Header;
