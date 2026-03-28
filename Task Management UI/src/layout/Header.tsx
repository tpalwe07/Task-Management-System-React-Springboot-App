import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { COLORS } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position='static' sx={{ bgcolor: COLORS.primaryMain }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task Management System
        </Typography>
        <IconButton onClick={toggleTheme} color='inherit' aria-label='toggle theme'>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = 'Header';
export default Header;
