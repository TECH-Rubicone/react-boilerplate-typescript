// outsource dependencies
import { useField } from 'formik';
import { CustomInput } from 'reactstrap';
import React, { memo, useMemo } from 'react';
import { CustomInputType } from 'reactstrap/es/CustomInput';

// local dependencies
import FieldWrap from './field-wrap';

interface FRadio {
  name: string;
  options?: any;
  success?: string;
  skipTouch?: boolean;
  description?: string;
  getOptionLabel?: any; // func
  getOptionValue?: any; // func
  classNameFormGroup?: string;
  label?: React.ReactNode | React.ReactChild;
  explanation?: React.ReactNode | React.ReactChild | string;
}

interface Property {
  id: string | number;
  type: CustomInputType;
  label?: React.ReactNode;
  inline?: boolean;
  valid?: boolean;
  invalid?: boolean;
  htmlFor?: string;
  value: string | number;
}

const FRadio: React.FC<FRadio> = props => {
  const {
    label, success, description, explanation,
    classNameFormGroup, skipTouch, options, name,
    getOptionLabel, getOptionValue, ...attr
  } = props;

  const [field, meta, { setValue }] = useField(name);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const properties = useMemo(() => options.map((item: any) => ({
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
    { properties.map((item: Property) => <CustomInput
      key={item.value}
      // field
      {...field}
      // outer
      valid={valid}
      invalid={invalid}
      // inner
      {...item}
    />) }
  </FieldWrap>;
};

export default memo(FRadio);
