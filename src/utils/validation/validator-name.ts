import { Validation } from '../../models/validation.types';
import { isValidLength } from './validator-length';

export const validateName: Validation = (name: string) => {
  if (name.length <= 2 || name.length >= 25) {
    return { isValid: false, helperText: 'Name must be between 3 to 24 characters' };
  }

  const REG = /^[\w-_.]*$/g;

  const isValid = REG.test(name.trim());

  isValidLength(name, { min: 2, max: 32 })

  if (isValid) {
    return { isValid: isValid };
  } else {
    return { isValid: false, helperText: 'Name must include only Latin letters, -, _  and numbers' };
  }
};

