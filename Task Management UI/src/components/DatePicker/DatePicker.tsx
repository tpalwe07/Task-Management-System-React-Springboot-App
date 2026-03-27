import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { FormHelperText, Stack } from '@mui/material';
import {
  DatePicker as DPicker,
  type DatePickerProps as DPickerProps
} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PickersActionBarAction } from '@mui/x-date-pickers/PickersActionBar';

export interface DatePickerProps extends Omit<DPickerProps, 'onChange'> {
  label: string;
  value: Dayjs | null;
  helperText?: string;
  errorMessage?: string;
  actions?: PickersActionBarAction[];
  onChange?: (value: Dayjs | null) => void;
  inputName?: string;
  textField?: object;
}

const DatePicker = ({
  label,
  value,
  onChange,
  helperText,
  errorMessage,
  actions = ['clear', 'today', 'cancel', 'accept'],
  inputName,
  textField,
  ...props
}: DatePickerProps) => {
  const [currentValue, setCurrentValue] = useState<Dayjs | null>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (value: Dayjs | null) => {
    setCurrentValue(value);

    if (errorMessage && onChange) {
      onChange(value);
    }
  };

  const handleAccept = (value: Dayjs | null) => {
    if (onChange) onChange(value);
  };

  const showHelperTextOrErrorMessage = () => {
    if (errorMessage) {
      return <FormHelperText error={true}>{errorMessage}</FormHelperText>;
    }

    const text = helperText;
    if (text) return <FormHelperText>{text}</FormHelperText>;
  };

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
        <DPicker
          {...(inputName && { name: inputName })}
          label={label}
          value={currentValue}
          onChange={handleChange}
          onAccept={handleAccept}
          slotProps={{
            actionBar: {
              actions
            },
            textField: {
              error: !!errorMessage,
              ...textField
            }
          }}
          {...props}
        />
      </LocalizationProvider>
      {showHelperTextOrErrorMessage()}
    </Stack>
  );
};
DatePicker.displayName = 'DatePicker';

export default DatePicker;
