import { type ReactNode, useEffect, useState } from 'react';
import {
  type BaseSelectProps,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Radio,
  type SxProps,
  type Theme
} from '@mui/material';

export type OptionType = {
  value: string;
  name: ReactNode;
};

export interface SelectPropsInterface extends BaseSelectProps {
  id: string;
  label: ReactNode;
  value?: string;
  options: OptionType[];

  errorMessage?: ReactNode;
  includeRadioBox?: boolean;
  helperText?: ReactNode;
  handleOnBlur?: (name: string, value: string | undefined) => void;
  handleOnChange?: (name: string, value: string | undefined) => void;
  showNoneOption?: boolean;
  formControlSx?: SxProps<Theme>;
}

const Select = ({
  id,
  label,
  value,
  options,
  errorMessage,
  handleOnBlur,
  handleOnChange,
  helperText,
  includeRadioBox,
  showNoneOption = true,
  formControlSx = {},
  ...props
  // eslint-disable-next-line complexity
}: SelectPropsInterface) => {
  const [name, setName] = useState<ReactNode | undefined>();
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');

  useEffect(() => {
    setNameOnValueChange(value || '');
    setCurrentValue(value || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); //Todo: if needed improve useEffect

  const setNameOnValueChange = (value: string) => {
    const currentOption = options.find((item) => item.value === value);
    setName(currentOption?.name);
  };

  const onChange = (selectedValue: string) => {
    setNameOnValueChange(selectedValue);
    setCurrentValue(selectedValue);

    if (handleOnChange) handleOnChange(id, selectedValue);
  };

  const onBlur = () => {
    if (handleOnBlur) handleOnBlur(id, currentValue);
  };

  const showMenuOption = () =>
    options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {includeRadioBox ? <Radio checked={currentValue === option.value} /> : ''}
        {option.name}
      </MenuItem>
    ));

  const showHelperTextOrErrorMessage = () => {
    const text = errorMessage || helperText;
    if (!text) {
      return null;
    }

    return <FormHelperText error={!!errorMessage}>{text}</FormHelperText>;
  };

  const renderSelectInputValue = () => {
    if (name) {
      return name;
    }
    return label;
  };

  return (
    <FormControl error={!!errorMessage} sx={formControlSx} fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        variant='outlined'
        id={id}
        labelId={id}
        label={label}
        onBlur={onBlur}
        onChange={(e) => onChange((e.target.value as string) ?? '')}
        value={currentValue}
        renderValue={() => renderSelectInputValue()}
        {...props}
      >
        {showNoneOption ? (
          <MenuItem key='empty' value={undefined}>
            None
          </MenuItem>
        ) : null}
        {showMenuOption()}
      </MuiSelect>
      {showHelperTextOrErrorMessage()}
    </FormControl>
  );
};
Select.displayName = 'Select';

export default Select;
