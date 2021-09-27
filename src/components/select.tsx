// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// outsource dependencies
import Select from 'react-select';
import { useField } from 'formik';
import React, { memo, useCallback } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

interface FSelect {
  name?: string;
  success?: string;
  disabled: boolean;
  placeholder: string;
  skipTouch?: boolean;
  explanation?: string;
  onError?: any;// func
  description?: string;
  onSuccess?: any;// func
  onFinally?: any;// func
  classNameLabel?: string;
  parseValue?: any;// func
  prepareValue?: any; // func
  classNameFormGroup?: string;
  label?: React.ReactChild | React.ReactNode;
}

const FSelect: React.FC<FSelect> = ({
  label, skipTouch, success, description, explanation, classNameLabel, classNameFormGroup,
  disabled, name, prepareValue, onSuccess, onError, onFinally, parseValue, ...attr
}) => {
  const [field, meta, { setValue, setTouched }] = useField(name as string);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const onChange = useCallback((value: any) => {
    try {
      setValue(prepareValue(value));
      onSuccess(value);
    } catch (error) {
      onError(error);
    } finally {
      onFinally(value);
    }
  }, [onError, onFinally, onSuccess, prepareValue, setValue]);
  const onBlur = useCallback(() => setTouched(true), [setTouched]);

  return <FieldWrap
    label={label}
    valid={valid}
    id={field.name}
    invalid={invalid}
    success={success}
    description={description}
    explanation={explanation}
    className={classNameFormGroup}
    classNameLabel={classNameLabel}
    error={skipTouch || meta.touched ? meta.error : null}
  >
    <Select
      onBlur={onBlur}
      onChange={onChange}
      isDisabled={disabled}
      styles={defaultStyles}
      value={parseValue(field.value)}
      theme={stylesReactSelect(valid, invalid)}
      {...attr}
    />
  </FieldWrap>;
};

export default memo(FSelect);

export const stylesReactSelect = (valid: boolean, invalid: boolean) => (theme: any) => ({
  ...theme,
  colors: valid === invalid
    ? theme.colors
    : valid ? {
      ...theme.colors,
      primary75: 'rgba(35, 183, 229, 0.75)',
      primary50: 'rgba(35, 183, 229, 0.5)',
      primary25: 'rgba(35, 183, 229, 0.25)',
      primary: '#28a745',
      neutral15: '#28a745',
      neutral20: '#28a745',
      neutral30: '#28a745',
      neutral40: '#28a745',
      neutral50: '#28a745',
      neutral60: '#28a745',
      neutral70: '#28a745',
      neutral80: '#28a745',
      neutral90: '#28a745',
    } : {
      ...theme.colors,
      primary75: 'rgba(35, 183, 229, 0.75)',
      primary50: 'rgba(35, 183, 229, 0.5)',
      primary25: 'rgba(35, 183, 229, 0.25)',
      primary: '#f05050',
      neutral10: '#f05050',
      neutral15: '#f05050',
      neutral20: '#f05050',
      neutral30: '#f05050',
      neutral40: '#f05050',
      neutral50: '#f05050',
      neutral60: '#f05050',
      neutral70: '#f05050',
      neutral80: '#f05050',
      neutral90: '#f05050',
    },
});

export const stylesReactSelectSmall = { // NOTE try to change size as "form-control-sm" in bootstrap
  control: (base: any, state: any) => ({ ...base, minHeight: 31, borderColor: state.isDisabled ? '#ced4da' : base.borderColor, backgroundColor: state.isDisabled ? '#e9ecef' : '#ffffff' }),
  dropdownIndicator: (base: any) => ({ ...base, minHeight: 1, height: 28, alignItems: 'center', padding: '8px 4px' }),
  clearIndicator: (base: any) => ({ ...base, minHeight: 1, height: 28, alignItems: 'center', padding: '8px 4px' }),
  indicatorsContainer: (base: any) => ({ ...base, minHeight: 1, height: 'auto', }),
  valueContainer: (base: any) => ({ ...base, minHeight: 1, height: 'auto' }),
  container: (base: any) => ({ ...base, minHeight: 1, height: 'auto' }),
  placeholder: (base: any) => ({ ...base, minHeight: 1, height: 22 }),
  input: (base: any) => ({ ...base, minHeight: 1, height: 22 }),
};

export const defaultStyles = {
  control: (base: any, state: any) => ({ ...base, borderColor: state.isDisabled ? '#ced4da' : base.borderColor, backgroundColor: state.isDisabled ? '#e9ecef' : '#ffffff' }),
};
