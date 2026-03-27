import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  type BaseSelectProps,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import type { OptionType } from './Select';

export interface MultiSelectPropsInterface extends Omit<
  BaseSelectProps<string[]>,
  'id' | 'onChange' | 'value'
> {
  id: string;
  value?: string[];
  options: OptionType[];

  errorMessage?: ReactNode;
  // translateName?: boolean;
  includeCheckbox?: boolean;
  includeLogo?: boolean;
  helperText?: ReactNode;
  handleOnChange?: (name: string, value: string[]) => void;
}

export type SelectOptionsType = Pick<MultiSelectPropsInterface, 'options'>;

const MultiSelect = ({
  id,
  label,
  value,
  options,
  errorMessage,
  handleOnChange,
  helperText,
  // translateName = true,
  includeCheckbox = true,
  ...props
  // eslint-disable-next-line complexity
}: MultiSelectPropsInterface) => {
  const ref = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLLabelElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [currentValue, setCurrentValue] = useState<string[]>(value?.length ? value : []);

  useEffect(() => {
    setNameOnValueChange(value || []);
    setCurrentValue(value || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.length]); //Todo: if needed improve useEffect

  const setNameOnValueChange = (value: string[]) => {
    const labels = options.filter((option) => value.includes(option.value));
    setSelectedOptions(labels);
  };

  const onChange = (value: string[]) => {
    setNameOnValueChange(value);
    setCurrentValue(value);

    if (handleOnChange) handleOnChange(id, value);
  };

  const showMenuOption = () =>
    options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {includeCheckbox ? <Checkbox checked={currentValue.includes(option.value)} /> : ''}
        {option.name}
      </MenuItem>
    ));

  const showHelperTextOrErrorMessage = () => {
    if (errorMessage) {
      return <FormHelperText error={true}>{errorMessage}</FormHelperText>;
    }

    const text = helperText;
    if (text) return <FormHelperText>{text}</FormHelperText>;
  };

  const handleDelete = (itemToBeDeleted: string) => () => {
    const newValue = currentValue.filter((item) => item !== itemToBeDeleted);

    onChange(newValue);
    ref.current?.classList.remove('Mui-focused');
    inputRef.current?.classList.remove('Mui-focused');
  };

  const input = useMemo(() => {
    return <OutlinedInput id={id} label={label ?? id} />;
  }, [id, label]);

  return (
    <FormControl error={!!errorMessage} fullWidth>
      <InputLabel id={id} ref={inputRef}>
        {label}
      </InputLabel>
      <Select
        ref={ref}
        multiple
        id={id}
        variant='outlined'
        labelId={`${id}-label`}
        input={input}
        onChange={(e) => onChange(e.target.value as string[])}
        value={currentValue}
        renderValue={(selected) => {
          if (!selected.length) return label;

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedOptions.map((option) => (
                <Chip
                  sx={{ margin: '2px' }}
                  key={option.value}
                  label={option.name}
                  onDelete={handleDelete(option.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              ))}
            </Box>
          );
        }}
        onClose={() => {
          ref.current?.classList.remove('Mui-focused');
          inputRef.current?.classList.remove('Mui-focused');
        }}
        {...props}
      >
        {showMenuOption()}
      </Select>
      {showHelperTextOrErrorMessage()}
    </FormControl>
  );
};
MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
