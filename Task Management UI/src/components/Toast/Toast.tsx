import { Alert, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Snackbar, { type SnackbarCloseReason, type SnackbarOrigin } from '@mui/material/Snackbar';
import useResponsive from '../../hooks/responsive/useResponsive';
import { COLORS } from '../../theme/theme';
import { CheckCircle, Error } from '@mui/icons-material';

export const AUTO_HIDE_DURATION = 3000;
export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps extends Omit<SnackbarOrigin, 'vertical' | 'horizontal'> {
  open: boolean;
  type?: ToastType;
  title?: React.ReactNode;
  message: React.ReactNode;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  autoHideDuration?: number;
  onClose?: () => void;
}

const Toast = ({
  open = false,
  type = 'success',
  title,
  message,
  vertical = 'top',
  horizontal = 'center',
  autoHideDuration = AUTO_HIDE_DURATION,
  onClose
  // eslint-disable-next-line complexity
}: ToastProps) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (_e?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
    if (onClose) onClose();
  };

  // eslint-disable-next-line complexity
  const getMarginTop = () => {
    if (isMobile) return '185px';
    if (isTablet) return '85px';
    if (isDesktop || isLargeDesktop) return '66px';
  };

  const iconMapping = {
    success:
      type === 'success' ? (
        <CheckCircle height='2.3rem' width='2.3rem' viewBox='0 0 24 20' color='inherit' />
      ) : (
        <></>
      ),
    error:
      type === 'error' ? (
        <Error height='2.3rem' width='2.3rem' viewBox='0 0 24 20' color='inherit' />
      ) : (
        <></>
      )
  };

  const shouldShowIcon = type === 'success' || type === 'error';

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      key={vertical + horizontal}
      sx={{ marginTop: getMarginTop() }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant='filled'
        iconMapping={iconMapping}
        sx={{
          width: '100%',
          color: COLORS.white,
          alignItems: 'center',
          '& .MuiAlert-icon': {
            display: shouldShowIcon ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0
          },
          '& .MuiAlert-action': {
            alignSelf: 'flex-start',
            paddingTop: 0,
            marginTop: 0
          }
        }}
        aria-label='alert'
        role='alert'
      >
        <Box
          sx={{
            ...(shouldShowIcon && { borderLeft: `2px solid ${COLORS.white}` }),
            marginLeft: shouldShowIcon ? '10px' : '0px',
            paddingLeft: shouldShowIcon ? '10px' : '0px'
          }}
        >
          {title && (
            <Typography
              variant='body1'
              sx={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {title}
            </Typography>
          )}
          <Typography variant='body2'>{message}</Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

Toast.displayName = 'Toast';
export default Toast;
