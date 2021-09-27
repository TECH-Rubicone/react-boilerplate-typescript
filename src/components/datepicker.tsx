// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//outsource dependencies
import { useField } from 'formik';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import React, { useCallback, useMemo, memo } from 'react';

import config from 'configs/app-config';

// hooks
import { useMoment } from 'hooks/moment';

//local dependencies
import FieldWrap from './field-wrap';

interface FDatepickerProps {
  name: string,
  format?: string,
  success?: string,
  skipTouch?: boolean,
  inputMask?: string,
  dateFormat?: string,
  description?: string,
  explanation?: string,
  placeholder?: string,
  classNameLabel?: string,
  classNameFormGroup?: string,
  label?: React.ReactChild | React.ReactNode,
}

const FDatepicker: React.FC<FDatepickerProps> = props => {
  const {
    classNameFormGroup, classNameLabel,
    name, label, success, skipTouch, description, explanation,
    placeholder, inputMask, dateFormat, format, ...attr
  } = props;

  const [field, meta, { setTouched, setValue }] = useField(name);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const moment = useMoment();

  const selectedDate = useMemo(
    () => moment(field.value, format, true).isValid()
      ? moment(field.value, format).toDate()
      : null,
    [field.value, format, moment]
  );

  const onChange = useCallback(date => {
    setValue(moment(date).format(format));
    setTouched(true);
  }, [format, moment, setTouched, setValue]);
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
    <DatePicker
      onBlur={onBlur}
      name={field.name}
      onChange={onChange}
      dateFormat={dateFormat}
      selected={selectedDate}
      placeholderText={placeholder}
      customInput={<InputMask
        type="text"
        mask={inputMask}
        value={field.value}
        className={classnames('form-control', { 'is-invalid': invalid, 'is-valid': valid })}
      />}
      {...attr}
    />
  </FieldWrap>;
};

export default memo(FDatepicker);
