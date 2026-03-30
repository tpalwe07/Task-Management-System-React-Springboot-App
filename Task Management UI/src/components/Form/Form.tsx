import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react';
import dayjs, { Dayjs } from 'dayjs';

import CustomInput, { type CustomInputProps } from '../Input/Input';
import Button from '../../components/Button/Button';
import MultiSelect, { type MultiSelectPropsInterface } from '../../components/Select/MultiSelect';

import type {
  CustomFormProps,
  DateTimeProps,
  Field,
  FormAction,
  FormErrors,
  FormState,
  FormValue,
  FormValues,
  MultiSelectFieldProps,
  SelectFieldProps,
  TextFieldProps
} from './types';

import './Form.css';
import { validateField } from './formUtility';
import { Divider, FormHelperText, Grid } from '@mui/material';
import DateTimePicker, { type DateTimePickerProps } from '../DateTimePicker/DateTimePicker';
import Select, { type SelectPropsInterface } from '../Select/Select';
import DatePicker, { type DatePickerProps } from '../DatePicker/DatePicker';

const formReducer = (state: FormState, action: FormAction): FormState => {
  if (action.type === 'UPDATE_FIELD') {
    return { ...state, [action.name]: action.value };
  }
  if (action.type === 'RESET_FORM') {
    return action.initialValues;
  }
  return state;
};

const CustomForm: FC<CustomFormProps> = ({
  fields,
  onSubmit,
  initialValues = {},
  resetValues = {},
  extendedSearchSectionName = 'Extended Search',
  applyButtonText = 'label.apply',
  resetButtonText = 'label.reset',
  hideResetButton = false,
  disableSubmitButton,
  autoComplete = 'off',
  onApplyClick,
  onResetClick,
  isButtonLoading = false,
  formContainerStyles,
  formActionContainerStyles,
  formButtonStyles,
  onFormChange
  // eslint-disable-next-line complexity
}) => {
  const [state, dispatch] = useReducer(formReducer, initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const prevStateRef = useRef(state); // Create a ref to store the previous state

  // Notify parent of form value changes in real time
  useEffect(() => {
    onFormChange?.(state as unknown as FormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Initialize form state based on initialValues and fields on component mount
  useMemo(() => {
    const initialState: FormState = {};
    fields.forEach((field) => {
      initialState[field.name] = initialValues[field.name] || '';
    });
    dispatch({ type: 'RESET_FORM', initialValues: initialState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleChange = useCallback(
    // eslint-disable-next-line complexity, react-func/max-lines-per-function
    (event: ChangeEvent<HTMLInputElement>, field: TextFieldProps) => {
      const { name, value, type } = event.target;

      let actualValue;
      if (type === 'number' && value) {
        actualValue = +value;
      } else {
        actualValue = value;
      }

      // Call custom onChange handler if provided
      if (field && field.onChangeHandler) {
        const result = field.onChangeHandler(event);
        if (result) {
          const { value: newValue, message, validation, otherFieldsError } = result;
          dispatch({ type: 'UPDATE_FIELD', name, value: newValue as FormValue });
          const errObj: FormErrors = {}; // Initialize errObj as an empty object
          if (otherFieldsError && otherFieldsError.length) {
            otherFieldsError.forEach((o) => {
              const obj = {
                message: o.message,
                validation: o.validation
              };
              errObj[o.name] = o.message ? obj : undefined;
            });
          }
          errObj[name] = message ? { message, validation } : undefined; // Clear error if no validation rules
          setErrors((prevErrors) => ({ ...prevErrors, ...errObj })); // Set error from parent including errObj
        }
      } else {
        dispatch({ type: 'UPDATE_FIELD', name, value: actualValue as FormValue });
        // Validate the field immediately upon change
        if (field && field.validations) {
          const error = validateField(actualValue, field.validations);
          setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        }
      }
    },
    [dispatch, setErrors]
  );

  const onDateChange = useCallback(
    // eslint-disable-next-line complexity
    (name: string, value: Dayjs | null, field: DateTimeProps) => {
      if (field && field.onAccept) {
        const result = field.onAccept(value);
        if (result) {
          const { value: newValue, message, validation, otherFieldsError } = result;
          dispatch({
            type: 'UPDATE_FIELD',
            name,
            value: field.formatter(newValue as Dayjs | null) as FormValue
          });
          const errObj: FormErrors = {}; // Initialize errObj as an empty object
          if (otherFieldsError && otherFieldsError.length) {
            otherFieldsError.forEach((o) => {
              const obj = {
                message: o.message,
                validation: o.validation
              };
              errObj[o.name] = o.message ? obj : undefined;
            });
          }
          errObj[name] = message ? { message, validation } : undefined; // Clear error if no validation rules
          setErrors((prevErrors) => ({ ...prevErrors, ...errObj })); // Set error from parent including errObj
        }
      } else {
        dispatch({ type: 'UPDATE_FIELD', name, value: field.formatter(value) });
        // Validate the field immediately upon change
        if (field && field.validations) {
          const error = validateField(value, field.validations);
          setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        }
      }
    },
    [dispatch]
  );

  const handleSelectChange = useCallback(
    // eslint-disable-next-line complexity
    (name: string, elementValue: string[] | string | undefined) => {
      dispatch({ type: 'UPDATE_FIELD', name, value: elementValue });
      const field = fields.find((f) => f.name === name);

      (field as SelectFieldProps).onSelectChangeHandler?.(elementValue as string | undefined);

      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
      if (field && field.validations) {
        const error = validateField(elementValue, field.validations);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      }
    },
    [dispatch, setErrors, fields]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET_FORM', initialValues: resetValues });
    setErrors({});
  }, [dispatch, resetValues]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line complexity
    (event: FormEvent) => {
      event.preventDefault();

      let isValid = true;
      const newErrors: FormErrors = {};

      // eslint-disable-next-line complexity
      fields.forEach((field) => {
        const value =
          field.type === 'number' ? +(state[field.name] ?? 0) : (state[field.name] as string);

        const error = field.validations ? validateField(value, field.validations) : null;

        if (error || errors[field.name]) {
          isValid = false;
          newErrors[field.name] = error || errors[field.name];
        }
      });

      setErrors(newErrors);

      if (isValid && Object.keys(newErrors).length === 0) {
        // Check if state has changed compared to previous state. Ex - on auditlogs filter popup, if user clicks submit without modifying any field, onSubmit (API/parent actions) should not be called.
        const isStateChanged =
          JSON.stringify(JSON.parse(JSON.stringify(prevStateRef.current))) !==
          JSON.stringify(JSON.parse(JSON.stringify(state)));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isStateChanged && onSubmit(state as unknown as FormValues);
        onApplyClick?.(); // this will close the popover
      }
    },
    [fields, state, onSubmit, onApplyClick, errors]
  );

  // eslint-disable-next-line complexity
  const renderField = (field: Field) => {
    return (
      <Grid key={field.name} size={field.gridProps ? field.gridProps?.size : { xs: 12 }}>
        {(field.type === 'text' ||
          field.type === 'number' ||
          field.type === 'email' ||
          field.type === 'date') && (
          <CustomInput
            {...(field.componentsOtherProps as CustomInputProps)}
            fullWidth
            label={field.label}
            placeholder={(field.componentsOtherProps as CustomInputProps)?.placeholder || ''}
            name={field.name}
            type={field.type}
            value={(state[field.name] || '') as string}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e as ChangeEvent<HTMLInputElement>, field as TextFieldProps)
            }
            error={!!errors[field.name]}
            helperText={
              errors[field.name]?.message ? (
                <FormHelperText error>{errors[field.name]?.message}</FormHelperText>
              ) : null
            }
            required={!!field.validations?.required}
          />
        )}

        {field.type === 'multiselect' && (
          <MultiSelect
            {...(field.componentsOtherProps as MultiSelectPropsInterface)}
            size={(field.componentsOtherProps as MultiSelectPropsInterface)?.size}
            id={field.name}
            name={field.name}
            label={field.label}
            value={state[field.name] as string[] | undefined}
            handleOnChange={handleSelectChange}
            options={(field as MultiSelectFieldProps).options}
            error={!!errors[field.name]}
            errorMessage={errors[field.name]?.message as string}
          />
        )}

        {field.type === 'select' && (
          <Select
            {...(field.componentsOtherProps as SelectPropsInterface)}
            size={(field.componentsOtherProps as SelectPropsInterface)?.size}
            id={field.name}
            name={field.name}
            label={field.label}
            value={state[field.name] as string | undefined}
            handleOnChange={handleSelectChange}
            options={(field as SelectFieldProps).options}
            showNoneOption={false}
            error={!!errors[field.name]}
            errorMessage={errors[field.name]?.message as string}
          />
        )}

        {field.type === 'datetimePicker' && (
          <DateTimePicker
            {...(field.componentsOtherProps as DateTimePickerProps)}
            name={field.name}
            label={field.label}
            value={state[field.name] ? dayjs(state[field.name] as string) : null}
            errorMessage={errors[field.name]?.message as string}
            // eslint-disable-next-line complexity
            onError={(error) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let currentError: any;
              if (error) {
                let messageKey = `form.validationMessage.date.${error}`;
                if (field.validations && error in field.validations) {
                  const validation = field.validations[error as keyof typeof field.validations];
                  messageKey = validation?.message ?? messageKey;
                }
                currentError = {
                  validation: 'INNER_DATE_VALIDATION',
                  message: messageKey
                };
              }
              setErrors((prevErrors) => ({
                ...prevErrors,
                [field.name]: currentError
              }));
            }}
            onChange={(value: Dayjs | null) =>
              onDateChange(field.name, value, field as DateTimeProps)
            }
          />
        )}

        {field.type === 'datePicker' && (
          <DatePicker
            {...(field.componentsOtherProps as DatePickerProps)}
            name={field.name}
            label={field.label}
            value={state[field.name] ? dayjs(state[field.name] as string) : null}
            errorMessage={errors[field.name]?.message as string}
            // eslint-disable-next-line complexity
            onError={(error) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let currentError: any;
              if (error) {
                let messageKey = `form.validationMessage.date.${error}`;
                if (field.validations && error in field.validations) {
                  const validation = field.validations[error as keyof typeof field.validations];
                  messageKey = validation?.message ?? messageKey;
                }
                currentError = {
                  validation: 'INNER_DATE_VALIDATION',
                  message: messageKey
                };
              }
              setErrors((prevErrors) => ({
                ...prevErrors,
                [field.name]: currentError
              }));
            }}
            onChange={(value: Dayjs | null) =>
              onDateChange(field.name, value, field as DateTimeProps)
            }
          />
        )}
      </Grid>
    );
  };

  const extendedFields = fields.filter((field) => field.isExtendedField);
  const separatedFields = fields.filter((field) => field.isSeparated);
  const regularFields = fields.filter((field) => !field.isExtendedField && !field.isSeparated);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete={autoComplete}
      style={formContainerStyles}
    >
      <Grid container spacing={2}>
        {regularFields.map((field) => renderField(field))}

        {extendedFields && extendedFields.length ? (
          <details>
            <summary>
              <span>{extendedSearchSectionName}</span>
            </summary>

            <Grid container spacing={2}>
              {extendedFields.map((field) => renderField(field))}
            </Grid>
          </details>
        ) : null}

        {separatedFields && separatedFields.length ? (
          <>
            <Grid size={12}>
              <Divider
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'grey.400',
                  my: 1
                }}
              />
            </Grid>
            {separatedFields.map((field) => renderField(field))}
          </>
        ) : null}

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            ...formActionContainerStyles
          }}
        >
          <Button
            onClick={onResetClick ? onResetClick : handleReset}
            sx={{
              display: !hideResetButton ? 'block' : 'none',
              ...formButtonStyles
            }}
            variant='outlined'
            size='large'
            id='form-reset-button'
          >
            {resetButtonText}
          </Button>

          <Button
            disabled={disableSubmitButton}
            type='submit'
            sx={{
              float: 'right',
              ...formButtonStyles
            }}
            size='large'
            loading={isButtonLoading}
            id='form-apply-button'
          >
            {applyButtonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};;

CustomForm.displayName = 'CustomForm';

export default CustomForm;
