// outsource dependencies
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import React, { memo, useCallback } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

const FNumberInput = props => {
  const {
    label, skipTouch, success, description, explanation, classNameLabel, classNameFormGroup, name, ...attr
  } = props;
  const { i18n } = useTranslation();
  const [field, meta, { setValue }] = useField({ name, });
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;
  const changeHandler = useCallback(({ floatValue }) => setValue(floatValue), [setValue]);

  return <FieldWrap
    label={label}
    valid={valid}
    id={field.name}
    invalid={invalid}
    success={success}
    explanation={explanation}
    description={description}
    className={classNameFormGroup}
    classNameLabel={classNameLabel}
    error={skipTouch || meta.touched ? meta.error : null}
  >
    <NumberFormat
      valid={valid}
      id={field.name}
      name={field.name}
      invalid={invalid}
      customInput={Input}
      value={field.value}
      onBlur={field.onBlur}
      onValueChange={changeHandler}
      decimalSeparator={i18n.language === 'en' ? '.' : ','}
      thousandSeparator={i18n.language === 'en' ? ',' : '.'}
      {...attr}
    />
  </FieldWrap>;
};

FNumberInput.propTypes = {
  lang: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.element,
  success: PropTypes.string,
  skipTouch: PropTypes.bool,
  allowNegative: PropTypes.bool,
  description: PropTypes.string,
  explanation: PropTypes.string,
  decimalScale: PropTypes.number,
  classNameLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  fixedDecimalScale: PropTypes.bool,
  classNameFormGroup: PropTypes.string,
};
FNumberInput.defaultProps = {
  lang: 'en_EN',
  // lang: 'de_DE',
  label: null,
  prefix: '€ ',
  success: null,
  decimalScale: 2,
  skipTouch: false,
  description: null,
  explanation: null,
  classNameLabel: '',
  allowNegative: false,
  classNameFormGroup: '',
  fixedDecimalScale: true,
};

export default memo(FNumberInput);
