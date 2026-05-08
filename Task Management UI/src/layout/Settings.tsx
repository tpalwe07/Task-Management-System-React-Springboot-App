import {
  AccountCircle,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined
} from '@mui/icons-material';
import { type FC, type MouseEvent, useState } from 'react';
import { Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { COLORS } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';
import RadioMenuButtons from '../components/RadioMenuButtons/RadioMenuButtons';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface SettingProps {
  username: string;
}

const Setting: FC<SettingProps> = ({ username }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ py: 2, px: 0, borderRadius: '0', justifyContent: 'flex-start' }}
        >
          <AccountCircle />
          {anchorElUser ? (
            <KeyboardArrowUpOutlined sx={{ color: COLORS.black }} />
          ) : (
            <KeyboardArrowDownOutlined sx={{ color: COLORS.black }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem sx={{ pointerEvents: 'none', cursor: 'default' }}>
          <Typography variant='body1' fontWeight='fontWeightBold'>
            {username}
          </Typography>
        </MenuItem>

        <Divider />
        <RadioMenuButtons
          options={[
            { label: 'Light Mode', value: 'light' },
            { label: 'Dark Mode', value: 'dark' }
          ]}
          value={mode}
          onChange={toggleTheme}
        />
        <Divider sx={{ marginBottom: '8px' }} />

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

Setting.displayName = 'Setting';

export default Setting;

