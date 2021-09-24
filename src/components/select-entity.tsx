// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback } from 'react';

// local dependencies
import FieldWrap from './field-wrap';
import SelectEntity from '../select-entity';

interface IFSelectEntity {
  name?: string;
  onError?: any; // func
  onSuccess?: any; // func
  onFinally?: any; // func
  success?: string;
  disabled: boolean;
  skipTouch?: boolean;
  placeholder: string;
  description?: string;
  explanation?: string;
  classNameLabel?: string;
  // onChange: func.isRequired;
  classNameFormGroup?: string;
  label?: React.ReactNode | React.ReactChild;
}

const FSelectEntity: React.FC<IFSelectEntity> = props => {
  const {
    description, explanation, classNameLabel, classNameFormGroup,
    label, skipTouch, success, disabled, name, onSuccess, onError, onFinally, ...attr
  } = props;
  const [field, meta, { setValue, setTouched }] = useField(name as string);
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  const onChange = useCallback(async value => {
    try {
      await setValue(value);
      await onSuccess(value);
    } catch (error) {
      await onError(error);
    } finally {
      await onFinally(value);
    }
  },
  [onError, onFinally, onSuccess, setValue]
  );
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
    <SelectEntity
      onBlur={onBlur}
      disabled={disabled}
      value={field.value}
      onChange={onChange}
      theme={stylesReactSelect(valid, invalid)}
      {...attr}
    />
  </FieldWrap>;
};

export default memo(FSelectEntity);

export const stylesReactSelect = (valid: boolean, invalid: boolean) => (theme: any) => ({
  ...theme,
  colors: valid === invalid
    ? { ...theme.colors }
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
      neutral10: 'hsl(0, 0%, 90%)',
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

