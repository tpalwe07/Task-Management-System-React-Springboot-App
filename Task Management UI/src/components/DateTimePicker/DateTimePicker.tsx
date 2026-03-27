import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { FormHelperText, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateTimePicker as DTPicker,
  type DateTimePickerProps as DTPickerProps
} from '@mui/x-date-pickers/DateTimePicker';

export interface DateTimePickerProps extends Omit<DTPickerProps, 'onChange'> {
  label: string;
  value: Dayjs | null;
  helperText?: string;
  errorMessage?: string;
  onChange?: (value: Dayjs | null) => void;
  inputName?: string;
}

const DateTimePicker = ({
  label,
  value,
  onChange,
  helperText,
  errorMessage,
  minutesStep = 1,
  inputName,
  ...props
}: DateTimePickerProps) => {
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
        <DTPicker
          {...(inputName && { name: inputName })}
          label={label}
          value={currentValue}
          timeSteps={{ hours: 1, minutes: minutesStep, seconds: 5 }}
          onChange={handleChange}
          onAccept={handleAccept}
          slotProps={{
            actionBar: {
              actions: ['clear', 'today', 'cancel', 'accept']
            },
            textField: {
              error: !!errorMessage
            }
          }}
          {...props}
        />
      </LocalizationProvider>
      {showHelperTextOrErrorMessage()}
    </Stack>
  );
};
DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
