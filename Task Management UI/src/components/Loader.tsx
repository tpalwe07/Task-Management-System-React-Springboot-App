import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({ height }: { height?: string | number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height || '30vh'
      }}
      data-testid='loader'
    >
      <CircularProgress />
    </Box>
  );
}

Loader.displayName = 'Loader';
