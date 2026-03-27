import React from 'react';
import { FormControlLabel, MenuItem, Radio, RadioGroup } from '@mui/material';
import type { SxProps, Theme } from '@mui/system';

export type RadioOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export interface RadioMenuButtonsProps<T extends string> {
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  onClose?: () => void;
  closeOnSelect?: boolean;
  name?: string;
  itemSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
}

const RadioMenuButtons = <T extends string>({
  options,
  value,
  onChange,
  onClose,
  closeOnSelect = true,
  name,
  itemSx = { pl: '6px' },
  labelSx = { m: 0, width: '100%', '.MuiFormControlLabel-label': { width: '100%' } }
  // eslint-disable-next-line complexity
}: RadioMenuButtonsProps<T>) => {
  // eslint-disable-next-line complexity
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value as T;
    const selectedOption = options.find((opt) => opt.value === next);
    if (selectedOption?.disabled) return; // Prevent change if disabled
    onChange(next);
    if (closeOnSelect) onClose?.();
  };

  return (
    <RadioGroup name={name} value={value} onChange={handleChange}>
      {options.map((opt) => (
        <MenuItem key={opt.value} disableRipple sx={itemSx}>
          <FormControlLabel
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            disabled={opt.disabled}
            sx={labelSx}
          />
        </MenuItem>
      ))}
    </RadioGroup>
  );
};

RadioMenuButtons.displayName = 'RadioMenuButtons';
export default RadioMenuButtons;
