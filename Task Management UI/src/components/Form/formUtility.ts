/* eslint-disable complexity */
import type { FormErrorType, ValidationRules } from './types';

const validateRequired = (
  validations: ValidationRules,
  value: unknown
): FormErrorType | undefined => {
  if (
    validations.required &&
    (!value ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0))
  ) {
    return {
      validation: 'required',
      message: validations.required.message
    };
  }
};

const validateMinMax = (
  validations: ValidationRules,
  value: unknown
): FormErrorType | undefined => {
  if (typeof value === 'number') {
    if (validations.min && value < validations.min.value) {
      return {
        validation: 'min',
        ...validations.min
      };
    }
    if (validations.max && value > validations.max.value) {
      return {
        validation: 'max',
        ...validations.max
      };
    }
  }
};

const validateMinMaxLength = (
  validations: ValidationRules,
  value: unknown
): FormErrorType | undefined => {
  if (typeof value === 'string') {
    if (validations.minLength && value.length < validations.minLength.value) {
      return {
        validation: 'minLength',
        ...validations.minLength
      };
    }
    if (validations.maxLength && value.length > validations.maxLength.value) {
      return {
        validation: 'maxLength',
        ...validations.maxLength
      };
    }
  }
};

const validatePattern = (
  validations: ValidationRules,
  value: unknown
): FormErrorType | undefined => {
  if (validations.pattern && !(validations.pattern.value as RegExp).test(value as string)) {
    return {
      validation: 'pattern',
      ...validations.pattern
    };
  }
};

export const validateField = (
  value: unknown,
  validations: ValidationRules | undefined
): FormErrorType | undefined => {
  if (!validations) return;

  let validationObj = validateRequired(validations, value);
  if (validationObj) return validationObj;

  validationObj = validateMinMax(validations, value);
  if (validationObj) return validationObj;

  validationObj = validateMinMaxLength(validations, value);
  if (validationObj) return validationObj;

  validationObj = validatePattern(validations, value);
  if (validationObj) return validationObj;
};
