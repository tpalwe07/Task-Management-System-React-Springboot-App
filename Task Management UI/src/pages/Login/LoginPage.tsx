/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
// @ts-expect-error: MUI icons may not have type declarations
import Visibility from '@mui/icons-material/Visibility';
// @ts-expect-error: MUI icons may not have type declarations
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '../../components/Button/Button';
import { isAuthenticated, login } from '../../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { COLORS, DARK_COLORS } from '../../theme/theme';
const logo = '/favicon.svg';

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// eslint-disable-next-line complexity
const resolveRedirectPath = (state: { from?: Location } | null) => {
  const pathname = state?.from?.pathname;
  return pathname && pathname !== '/login' ? pathname : '/projects';
};

// eslint-disable-next-line complexity
const LoginPage: React.FC = () => {
  const { mode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(
    () => resolveRedirectPath(location.state as { from?: Location } | null),
    [location.state]
  );
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // eslint-disable-next-line complexity
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    let valid = true;
    console.log('[Login Debug] handleLogin called', { email, password });
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError(null);
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError(null);
    }
    if (!valid) return;
    setLoading(true);
    try {
      const res = await login(email, password);
      console.log('[Login Debug] login() response:', res);
      navigate(from, { replace: true });
    } catch (err) {
      // Log the error for debugging
      console.error('[Login Debug] login() error:', err);
      const responseMessage = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setApiError(responseMessage || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const themeColors = mode === 'dark' ? DARK_COLORS : COLORS;
  const background = mode === 'dark' ? DARK_COLORS.background : '#121212';
  const paper = mode === 'dark' ? DARK_COLORS.paper : '#1e1e1e';
  const { errorColor } = COLORS;
  const { lightBorder, placeholder, white } = themeColors;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        sx={{
          minWidth: 340,
          maxWidth: 380,
          width: '100%',
          bgcolor: paper,
          boxShadow: 3,
          borderRadius: 3,
          p: 3
        }}
        elevation={8}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={logo} alt='App Logo' style={{ width: 56, height: 56 }} />
        </Box>
        <Typography variant='h5' align='center' color='text.primary' fontWeight={600} mb={2}>
          Sign in
        </Typography>
        <form onSubmit={handleLogin} noValidate>
          <Box mb={2}>
            <Typography component='label' htmlFor='email' color='text.secondary' fontSize={14}>
              Email Address
            </Typography>
            <Box mt={0.5} sx={{ position: 'relative' }}>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label='Email Address'
                autoComplete='email'
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  borderRadius: 8,
                  border: `1px solid ${emailError ? errorColor : lightBorder}`,
                  background: 'transparent',
                  color: white,
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onBlur={() => {
                  if (!validateEmail(email)) setEmailError('Enter a valid email address');
                  else setEmailError(null);
                }}
              />
              <EmailIcon
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: placeholder,
                  pointerEvents: 'none'
                }}
                fontSize='small'
                aria-hidden='true'
              />
              {emailError && (
                <Typography color='error' fontSize={12} mt={0.5}>
                  {emailError}
                </Typography>
              )}
            </Box>
          </Box>
          <Box mb={1.5}>
            <Typography component='label' htmlFor='password' color='text.secondary' fontSize={14}>
              Password
            </Typography>
            <Box mt={0.5} sx={{ position: 'relative' }}>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label='Password'
                autoComplete='current-password'
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  borderRadius: 8,
                  border: `1px solid ${passwordError ? errorColor : lightBorder}`,
                  background: 'transparent',
                  color: white,
                  fontSize: 16,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <LockIcon
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: placeholder,
                  pointerEvents: 'none'
                }}
                fontSize='small'
                aria-hidden='true'
              />
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={handleShowPassword}
                edge='end'
                tabIndex={0}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: themeColors.placeholder,
                  zIndex: 1
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              {passwordError && (
                <Typography color='error' fontSize={12} mt={0.5}>
                  {passwordError}
                </Typography>
              )}
            </Box>
          </Box>
          <Box mb={2} display='flex' justifyContent='flex-end'>
            <Button
              variant='text'
              color='primary'
              sx={{ textTransform: 'none', fontSize: 14, p: 0 }}
              onClick={(e) => {
                e.preventDefault();
                // Placeholder for forgot password
                console.log('Forgot password clicked');
              }}
              aria-label='Forgot password?'
            >
              Forgot password?
            </Button>
          </Box>
          {apiError && (
            <Typography color='error' fontSize={13} mt={1} mb={1} align='center'>
              {apiError}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 1, fontWeight: 600, fontSize: 16, borderRadius: 2, py: 1.5 }}
            aria-label='Login'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

LoginPage.displayName = 'LoginPage';
export default LoginPage;

