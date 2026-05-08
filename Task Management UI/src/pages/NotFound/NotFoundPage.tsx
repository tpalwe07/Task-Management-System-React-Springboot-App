import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS, DARK_COLORS } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const themeColors = mode === 'dark' ? DARK_COLORS : COLORS;
  const background = mode === 'dark' ? DARK_COLORS.background : '#f5f5f5';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3
      }}
    >
      <Typography variant='h3' fontWeight={700} color={themeColors.primaryMain} mb={1}>
        404
      </Typography>
      <Typography variant='h6' color='text.primary' mb={1}>
        Page not found
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={3}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Button variant='contained' onClick={() => navigate('/projects')}>
        Go to Projects
      </Button>
    </Box>
  );
};

NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;

