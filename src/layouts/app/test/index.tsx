// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';

// components
import FRadio from 'components/forms/radio';
import FInput from 'components/forms/input';

// local dependencies
import { controller } from './controller';
import FCheckbox from '../../../components/forms/checkbox';

// configure

const Test = () => {
  const [
    { initialized, disabled, errorMessage, initialValues },
    { updateData, initialize }
  ] = useController(controller);
  useEffect(() => { initialize(); }, [initialize]);
  const validationSchema = useMemo(() => yup.object().shape({
    username: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .email('VALIDATION_ERROR.INVALID_EMAIL'),
    password: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .min(8, 'VALIDATION_ERROR.MIN_LENGTH_CHARACTERS'),
    radioAny: yup.bool()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .oneOf([true], 'Field must be checked'),
    radioNumber: yup.number()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .oneOf([1, 2], 'Field must be checked'),
    checked: yup.bool()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .oneOf([true], 'Field must be checked'),
  }), []);

  const onSubmit = useCallback(values => {
    updateData(values);
  }, [updateData]);

  return <div style={{ marginTop: 40 }}>
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      { ({ values }) => <Form>
        <div>
          <FInput
            type="text"
            name="username"
            label="Email Address"
          />
        </div>
        <div>
          <FInput
            variant="filled"
            type="password"
            name="password"
            label="Password"
          />
        </div>
        <div>
          <FRadio
            required
            name="radioAny"
            label="radioAny"
            prepareFormValue={item => item.value}
            getFieldValue={item => item}
            getOptionValue={item => item?.value}
            getOptionLabel={item => item?.label}
            options={[5, '2', true].map(item => ({ value: item, label: `Number #${item}` }))}
          />
        </div>
        <div>
          <FRadio
            required
            name="radioNumber"
            label="radioNumber"
            prepareFormValue={item => item.value}
            getFieldValue={item => item}
            getOptionValue={item => item?.value}
            getOptionLabel={item => item?.label}
            options={[1, 2, 3, 4, 5].map(item => ({ value: item, label: `Number #${item}` }))}
          />
        </div>
        <div>
          <FRadio
            required
            name="radio2"
            label="radio2"
            prepareFormValue={item => item}
            getFieldValue={item => item?.id}
            getOptionValue={item => item?.id}
            getOptionLabel={item => item?.name}
            options={[{ id: 1, name: 'First' }, { id: '2', name: 'Second' }]}
          />
        </div>
        <div>
          <FRadio
            name="radioObject"
            label="radioObject"
            prepareFormValue={item => item}
            getFieldValue={item => item?.id}
            getOptionValue={item => item?.id}
            getOptionLabel={item => item?.label}
            options={[{ id: 1, label: 'First' }, { id: '2', label: 'Second' }]}
          />
        </div>
        <div>
          <FCheckbox
            options={[{ id: 1, label: 'First' }, { id: '2', label: 'Second' }]}
            name="checked"
            label="Remember me"
            prepareFormValue={item => item}
            getOptionValue={item => item?.id}
            getOptionLabel={item => item?.label}
          />
        </div>
        <pre>
          { JSON.stringify(values, null, 2) }
        </pre>
        <button type="submit">Submit</button>
      </Form> }
    </Formik>
  </div>;
};

export default memo(Test);
