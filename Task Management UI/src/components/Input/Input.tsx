import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export type CustomInputProps = {
  errorMessage?: ReactNode;
  startAdornmentComponent?: ReactNode;
  endAdornmentComponent?: ReactNode;
  shrinkInputLabel?: boolean;
} & TextFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

const CustomInput: FC<CustomInputProps> = ({
  variant = 'outlined',
  type,
  placeholder = '',
  label = '',
  errorMessage = '',
  error = false,
  min,
  max,
  minLength,
  maxLength,
  accept,
  pattern,
  readOnly = false,
  startAdornmentComponent = null,
  endAdornmentComponent = null,
  shrinkInputLabel,
  ...props
  // eslint-disable-next-line complexity
}) => {
  // TODO: handle trim logic
  return (
    <TextField
      type={type}
      variant={variant}
      placeholder={placeholder ? placeholder : ''}
      inputProps={{ min, max, minLength, maxLength, accept, pattern }}
      label={label}
      error={error}
      helperText={errorMessage}
      required={props.required}
      slotProps={{
        input: {
          readOnly,
          startAdornment: startAdornmentComponent,
          endAdornment: endAdornmentComponent
        },
        inputLabel: {
          shrink: shrinkInputLabel
        }
      }}
      {...props}
    />
  );
};

CustomInput.displayName = 'CustomInput';

export default CustomInput;
