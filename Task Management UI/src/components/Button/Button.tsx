import type { ReactElement } from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export interface CustomButtonProps extends ButtonProps {
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  title?: string;
  target?: string;
  id?: string;
}

const CustomButton = ({
  variant = 'contained',
  color = 'primary',
  disabled = false,
  icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
  loading = false,
  title,
  sx = {},
  id,
  ...props
  // eslint-disable-next-line complexity
}: CustomButtonProps) => {
  // eslint-disable-next-line complexity
  const showButton = () => {
    return (
      <Button
        variant={variant}
        color={color}
        id={id}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-label={ariaLabel}
        startIcon={!loading && iconPosition === 'left' ? icon : undefined}
        endIcon={!loading && iconPosition === 'right' ? icon : undefined}
        sx={{ ...sx }}
        {...props}
      >
        {loading ? <CircularProgress size={20} color={color} /> : props.children}
      </Button>
    );
  };

  return <>{title ? <div title={title}>{showButton()}</div> : showButton()}</>;
};

CustomButton.displayName = 'CustomButton';
export default CustomButton;
