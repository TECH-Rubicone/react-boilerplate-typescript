// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// outsource dependencies
import { useField } from 'formik';
import { Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import React, { memo, useCallback } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

interface IFNumberInput {
  name: string;
  lang?: string;
  prefix?: string;
  success?: string;
  skipTouch?: boolean;
  allowNegative?: boolean;
  description?: string;
  explanation?: string;
  decimalScale?: number;
  classNameLabel?: string;
  fixedDecimalScale?: boolean;
  classNameFormGroup?: string;
  label?: React.ReactNode | React.ReactChild;
}

const FNumberInput: React.FC<IFNumberInput> = props => {
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

export default memo(FNumberInput);
