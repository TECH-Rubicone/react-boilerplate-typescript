// outsource dependencies
import Select from 'react-select';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

const FSelect = ({
  label, skipTouch, success, description, explanation, classNameLabel, classNameFormGroup,
  disabled, name, prepareValue, onSuccess, onError, onFinally, parseValue, ...attr
}) => {
  const [field, meta, { setValue, setTouched }] = useField(name);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const onChange = useCallback(value => {
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

FSelect.propTypes = {
  name: PropTypes.string,
  onError: PropTypes.func,
  label: PropTypes.element,
  onSuccess: PropTypes.func,
  onFinally: PropTypes.func,
  success: PropTypes.string,
  skipTouch: PropTypes.bool,
  parseValue: PropTypes.func,
  prepareValue: PropTypes.func,
  description: PropTypes.string,
  explanation: PropTypes.string,
  classNameLabel: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  classNameFormGroup: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};
FSelect.defaultProps = {
  name: '',
  label: null,
  success: null,
  onError: e => e,
  skipTouch: false,
  description: null,
  explanation: null,
  classNameLabel: '',
  onSuccess: e => e,
  onFinally: e => e,
  parseValue: e => e,
  prepareValue: e => e,
  classNameFormGroup: '',
};

export default memo(FSelect);

export const stylesReactSelect = (valid, invalid) => theme => ({
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
  control: (base, state) => ({ ...base, minHeight: 31, borderColor: state.isDisabled ? '#ced4da' : base.borderColor, backgroundColor: state.isDisabled ? '#e9ecef' : '#ffffff' }),
  dropdownIndicator: base => ({ ...base, minHeight: 1, height: 28, alignItems: 'center', padding: '8px 4px' }),
  clearIndicator: base => ({ ...base, minHeight: 1, height: 28, alignItems: 'center', padding: '8px 4px' }),
  indicatorsContainer: base => ({ ...base, minHeight: 1, height: 'auto', }),
  valueContainer: base => ({ ...base, minHeight: 1, height: 'auto' }),
  container: base => ({ ...base, minHeight: 1, height: 'auto' }),
  placeholder: base => ({ ...base, minHeight: 1, height: 22 }),
  input: base => ({ ...base, minHeight: 1, height: 22 }),
};

export const defaultStyles = {
  control: (base, state) => ({ ...base, borderColor: state.isDisabled ? '#ced4da' : base.borderColor, backgroundColor: state.isDisabled ? '#e9ecef' : '#ffffff' }),
};
