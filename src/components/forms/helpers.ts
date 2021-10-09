
type ValidationColor = 'primary' | 'error' | 'success'

export const validationStyles = (valid: boolean, invalid: boolean): ValidationColor => {
  if (valid) {
    return 'success';
  } else if (invalid) {
    return 'error';
  }
  return 'primary';
};
