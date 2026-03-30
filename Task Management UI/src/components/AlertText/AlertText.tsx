import { Alert, Stack, Typography } from '@mui/material';

const AlertText = ({ text, severity }: { text: string; severity: 'error' | 'warning' | 'info' | 'success' }) => {
  return (
    <Stack spacing={2}>
      <Alert severity={severity}>
        <Typography variant='body2' color='text.secondary'>
          {text}
        </Typography>
      </Alert>
    </Stack>
  );
};
AlertText.displayName = 'AlertText';
export default AlertText;
