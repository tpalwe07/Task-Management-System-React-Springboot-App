import { Box, Typography } from '@mui/material';
import CopyButton from '../CopyButton/CopyButton';

interface TruncatedCopyFieldProps {
  value: string;
  maxLength?: number;
}

// eslint-disable-next-line complexity
const TruncatedCopyField = ({ value, maxLength = 10 }: TruncatedCopyFieldProps) => {
  if (!value) return null;

  const isTruncated = value.length > maxLength;
  const displayValue = isTruncated ? `${value.slice(0, maxLength)}…` : value;

  return (
    <Box
      sx={{
        display: 'inline-flex'
      }}
    >
      <Typography
        component='span'
        title={value}
        sx={{
          width: '110px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {displayValue}
      </Typography>
      <CopyButton
        value={value}
        size='small'
        sx={{ p: 0.5, width: '20px', justifyContent: 'center' }}
        stopPropagation
      />
    </Box>
  );
};

TruncatedCopyField.displayName = 'TruncatedCopyField';

export default TruncatedCopyField;
