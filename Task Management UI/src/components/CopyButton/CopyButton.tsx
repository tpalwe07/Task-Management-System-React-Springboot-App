import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type SxProps, type Theme } from '@mui/material/styles';
// import { handleCopy } from '../../utility/common';

export interface CopyButtonProps extends Omit<IconButtonProps, 'onClick'> {
  value: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  iconSx?: SxProps<Theme>;
  stopPropagation?: boolean;
}

const CopyButton = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  tooltipPlacement = 'top',
  iconSx,
  stopPropagation,
  ...iconButtonProps
}: CopyButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copied, _setCopied] = useState(false);

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy'} placement={tooltipPlacement}>
      <IconButton
        {...iconButtonProps}
        data-testid='content-copy-icon'
        name='Copy'
        onClick={(e) => {
          if (stopPropagation) {
            e.stopPropagation();
          }
          // handleCopy(setCopied, value);
        }}
      >
        <ContentCopyIcon fontSize='inherit' sx={iconSx} />
      </IconButton>
    </Tooltip>
  );
};

CopyButton.displayName = 'CopyButton';

export default CopyButton;
