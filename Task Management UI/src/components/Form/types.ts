import type { GridProps as MuiGridProps } from '@mui/material/Grid';
import type { SxProps, Theme } from '@mui/material';

import CustomInput from '../Input/Input';
import MultiSelect, { type SelectOptionsType } from '../Select/MultiSelect';
import { Dayjs } from 'dayjs';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Select from '../Select/Select';

export interface ValidationRules {
  required?: { message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  INNER_DATE_VALIDATION?: { message: string };
  maxDate?: { message: string };
}

interface BaseField {
  name: string;
  label: string;
  type: string;
  validations?: ValidationRules;
  componentsOtherProps?: Partial<
    React.ComponentProps<
      typeof CustomInput | typeof MultiSelect | typeof Select | typeof DateTimePicker
    >
  >;
  gridProps?: MuiGridProps;
  onChangeHandler?: (event: unknown) => FormErrorType;
  isExtendedField?: boolean;
  isSeparated?: boolean;
}

export interface TextFieldProps extends BaseField {
  type: 'text' | 'number' | 'email' | 'date';
}

export interface MultiSelectFieldProps extends BaseField {
  type: 'multiselect';
  options: SelectOptionsType['options'];
  value?: string[];
}

export interface SelectFieldProps extends BaseField {
  type: 'select'; // Todo: this needs to be implemented based on future filter requirement
  options: SelectOptionsType['options'];
  onSelectChangeHandler?: (value: string | undefined) => void;
}

// interface CheckboxFieldProps extends BaseField {
//   type: 'checkbox'; // Todo: this needs to be implemented based on future filter requirement
// }

export interface DateTimeProps extends BaseField {
  type: 'datetimePicker' | 'datePicker';
  formatter: (value: Dayjs | null) => string | undefined;
  onAccept?: (value: Dayjs | null) => FormErrorType;
}

export type Field =
  | TextFieldProps
  | SelectFieldProps
  | MultiSelectFieldProps
  // | CheckboxFieldProps
  | DateTimeProps;

export type FormValue = string | number | readonly string[] | undefined;
export type FormValues = { [key: string]: FormValue };

export type otherFieldsError = {
  message: string;
  validation: keyof ValidationRules;
  name: string;
}[];

export type FormErrors = {
  [key: string]:
    | {
        value?: number | string | RegExp | undefined | Dayjs | null;
        message: string;
        validation: keyof ValidationRules;
        otherFieldsError?: otherFieldsError; // pass otherFieldsError to set other fields error
      }
    | undefined;
};

export type FormErrorType = FormErrors[keyof FormErrors];

export interface CustomFormProps {
  fields: Field[];
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  resetValues?: FormValues;
  extendedSearchSectionName?: string;
  hideResetButton?: boolean;
  applyButtonText?: string;
  resetButtonText?: string;
  disableSubmitButton?: boolean;
  autoComplete?: 'on' | 'off';
  onApplyClick?: (e?: Event, reason?: 'backdropClick' | 'escapeKeyDown') => void;
  onResetClick?: () => void;
  isButtonLoading?: boolean;
  formContainerStyles?: React.CSSProperties;
  formActionContainerStyles?: MuiGridProps['sx'];
  formButtonStyles?: SxProps<Theme>;
}

export interface FormState {
  [key: string]: string | number | readonly string[] | Dayjs | undefined;
}

export type FormAction =
  | { type: 'UPDATE_FIELD'; name: string; value: FormValue }
  | { type: 'RESET_FORM'; initialValues: FormState };
