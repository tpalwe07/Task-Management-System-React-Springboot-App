import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Stack,
  type SxProps,
  type Theme,
  Typography
} from '@mui/material';
import Button, { type CustomButtonProps } from '../Button/Button';

interface PropsInterface extends Omit<DialogProps, 'title' | 'onClose'> {
  onClose: () => void;
  onSubmit?: () => void;
  loading?: boolean;
  title?: React.ReactNode;
  dividers?: boolean;
  iconCloseSx?: SxProps<Theme>;
  dialogContentSx?: SxProps<Theme>;
  submitButtonSx?: SxProps<Theme>;
  submitButtonProps?: CustomButtonProps;
  onCloseButton?: string;
  onSubmitButton?: string;
}

const Dialog = ({
  open,
  title,
  children,
  onClose,
  onSubmit,
  loading = false,
  dividers = true,
  submitButtonSx = {},
  submitButtonProps = {},
  dialogContentSx = {},
  iconCloseSx = { right: 8 },
  onCloseButton = 'Cancel',
  onSubmitButton = 'Submit',
  ...props
  // eslint-disable-next-line complexity
}: PropsInterface) => {
  return (
    <MuiDialog open={open} onClose={onClose} {...props} className='custom-dialog-container'>
      <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
        {title ? <DialogTitle>{title}</DialogTitle> : ''}
        <IconButton
          id='custom-dialog-container-close-button'
          aria-label='close'
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            height: 'fit-content',
            '&:hover': { borderRadius: '25px' },
            ...iconCloseSx
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent dividers={dividers} sx={dialogContentSx}>
        {children}
      </DialogContent>
      {onSubmit && (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: '1rem 1.5rem' }}>
          <Button variant='outlined' onClick={onClose} id='custom-dialog-container-cancel-button'>
            <Typography>{onCloseButton}</Typography>
          </Button>
          <Button
            loading={loading}
            sx={submitButtonSx}
            {...submitButtonProps}
            onClick={onSubmit}
            id='custom-dialog-container-submit-button'
          >
            <Typography>{onSubmitButton}</Typography>
          </Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
