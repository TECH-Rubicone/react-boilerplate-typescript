// outsource dependencies
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';
import React, { memo, useMemo } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

const FRadio = props => {
  const {
    label, success, description, explanation,
    classNameFormGroup, skipTouch, options, name,
    getOptionLabel, getOptionValue, ...attr
  } = props;

  const [field, meta, { setValue }] = useField(name);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const properties = useMemo(() => options.map(item => ({
    ...attr,
    value: getOptionValue(item),
    label: getOptionLabel(item),
    onChange: () => setValue(item),
    id: `${name}-${getOptionValue(item)}`,
    checked: getOptionValue(item) === getOptionValue(field.value),
  })), [attr, field.value, getOptionLabel, getOptionValue, name, options, setValue]);

  return <FieldWrap
    label={label}
    valid={valid}
    id={field.name}
    invalid={invalid}
    success={success}
    explanation={explanation}
    description={description}
    className={classNameFormGroup}
    error={skipTouch || meta.touched ? meta.error : null}
  >
    { properties.map(item => <CustomInput
      key={item.value}
      // field
      {...field}
      // outer
      type="radio"
      valid={valid}
      invalid={invalid}
      // inner
      {...item}
    />) }
  </FieldWrap>;
};


FRadio.propTypes = {
  label: PropTypes.node,
  options: PropTypes.array,
  success: PropTypes.string,
  skipTouch: PropTypes.bool,
  explanation: PropTypes.node,
  description: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  classNameFormGroup: PropTypes.string,
};
FRadio.defaultProps = {
  label: null,
  options: [],
  success: null,
  explanation: null,
  skipTouch: false,
  description: null,
  getOptionLabel: e => e,
  getOptionValue: e => e,
  classNameFormGroup: '',
};

export default memo(FRadio);
