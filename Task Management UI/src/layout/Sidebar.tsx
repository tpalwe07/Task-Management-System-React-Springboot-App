import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TaskIcon from '@mui/icons-material/TaskAlt';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import { COLORS } from '../theme/theme';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  route?: string;
}

const menuItems: MenuItem[] = [
  { id: 'tasks', label: 'Tasks', icon: <TaskIcon /> },
  { id: 'projects', label: 'Projects', icon: <FolderIcon />, route: '/projects' },
  { id: 'documents', label: 'Documents', icon: <DescriptionIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
];

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_COLLAPSED = 70;

// eslint-disable-next-line complexity
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const isActive = (route: string) => {
    if (!route) return false;
    // Check if current path matches or starts with the route
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  };

  // eslint-disable-next-line complexity
  const renderMenuItem = (item: MenuItem) => (
    <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
      <Tooltip title={collapsed ? item.label : ''} placement='right' arrow>
        <ListItemButton
          selected={isActive(item.route ?? '')}
          onClick={() => handleNavigation(item?.route ?? '')}
          sx={{
            mx: 1,
            borderRadius: 2,
            '&.Mui-selected': {
              backgroundColor: COLORS.primaryMain,
              '&:hover': {
                backgroundColor: COLORS.primaryMainLight
              }
            }
          }}
          role='menuitem'
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 40,
              justifyContent: 'center',
              color: isActive(item.route ?? '') ? COLORS.primaryDark : COLORS.black
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: isActive(item.route ?? '') ? 600 : 400
                }
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          position: 'relative',
          height: '100%'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          p: 2,
          minHeight: 64
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AppsIcon color='primary' />
          </Box>
        )}
        <IconButton onClick={handleToggle} size='small' aria-label='Toggle sidebar'>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ pt: 2 }} component='nav' aria-label='main navigation'>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Drawer>
  );
};

Sidebar.displayName = 'Sidebar';
export default Sidebar;

