// outsource dependencies
import * as yup from 'yup';
import { Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Mood as MoodIcon, SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon } from '@mui/icons-material';

// components
import FRadio from 'components/forms/radio';
import FInput from 'components/forms/input';
import FSwitch from 'components/form-switch';
import FCheckbox from 'components/forms/checkbox';
import FDatePicker from 'components/form-date-picker';
import Select, { AsyncSelect } from 'components/select';
import FSelect, { FAsyncSelect } from 'components/fselect';

// interfaces
import { AnyObject } from 'interfaces/common';

// services
import { instanceAPI } from 'services/api-private.service';

// local dependencies
import { controller } from './controller';

// interfaces for async response to get Users
interface PageFullRoleDto {
  content: Array<FullRoleDto>
  size: number
  offset: number
  pageNumber: number
  totalPages: number
  totalElements: number
}

type FullRoleDto = {
  id: number
  name: string
  permissions: Array<EntityContentDto>
}

type EntityContentDto = {
  id: number
  name: string
}

function getRoles ({ data, params }: AnyObject) {
  return instanceAPI.post<PageFullRoleDto, PageFullRoleDto>(
    'admin-service/roles/filter',
    {
      method: 'POST',
      data: data || {},
      params: params || {},
    }
  );
}

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
    userDate: yup.string()
      .nullable()
      .required('REQUIRED_FIELD'),
    formSwitch: yup.bool()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .oneOf([true], 'Field must be checked'),
  }), []);

  const onSubmit = useCallback(values => {
    updateData(values);
  }, [updateData]);

  const getRolesMemo = useCallback(
    () => getRoles({ data: null, params: { size: 15, page: 0 } }).then(({ content }) => content),
    []
  );

  return <Grid
    mt={4}
    container
    display="flex"
  >
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      { ({ values }) => <Form>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <FInput
              type="text"
              name="username"
              label="Email Address"
            />
            <FInput
              variant="filled"
              type="password"
              name="password"
              label="Password"
            />
            <FDatePicker
              name="userDate"
              inputFormat="MM/DD/YYYY"
              label="Add your birthday"
            />
          </Grid>
          <Grid item xs={4}>
            <pre>
              { JSON.stringify(values, null, 2) }
            </pre>
            <button type="submit">Submit</button>
          </Grid>
          <Grid item xs={8}>
            <FSwitch
              size="medium"
              name="formSwitch"
              color="secondary"
              label="Remember me"
              checkedIcon={<MoodIcon fontSize="small"/>}
              icon={<SentimentVeryDissatisfiedIcon fontSize="small"/>}
            />
            <FRadio
              required
              fullWidth
              name="radioAny"
              label="radioAny"
              prepareFormValue={item => item.value}
              getFieldValue={item => item}
              getOptionValue={item => item?.value}
              getOptionLabel={item => item?.label}
              options={[5, '2', true].map(item => ({ value: item, label: `Number #${item}` }))}
            />
          </Grid>
          <Grid item xs={7}>
            <FRadio
              required
              fullWidth
              name="radioNumber"
              label="radioNumber"
              prepareFormValue={item => item.value}
              getFieldValue={item => item}
              getOptionValue={item => item?.value}
              getOptionLabel={item => item?.label}
              options={[1, 2, 3, 4, 5].map(item => ({ value: item, label: `Number #${item}` }))}
            />
          </Grid>
          <Grid item xs={7}>
            <FRadio
              required
              fullWidth
              name="radio2"
              label="radio2"
              prepareFormValue={item => item}
              getFieldValue={item => item?.id}
              getOptionValue={item => item?.id}
              getOptionLabel={item => item?.name}
              options={[{ id: 1, name: 'First' }, { id: '2', name: 'Second' }]}
            />
          </Grid>
          <Grid item xs={7}>
            <FRadio
              fullWidth
              name="radioObject"
              label="radioObject"
              prepareFormValue={item => item}
              getFieldValue={item => item?.id}
              getOptionValue={item => item?.id}
              getOptionLabel={item => item?.label}
              options={[{ id: 1, label: 'First' }, { id: '2', label: 'Second' }]}
            />
          </Grid>
          <Grid item xs={7}>
            <FCheckbox
              required
              fullWidth
              name="checked"
              label="Remember me"
              prepareFormValue={item => item}
              getOptionValue={item => item?.id}
              getOptionLabel={item => item?.label}
              options={[{ id: 1, label: 'First' }, { id: '2', label: 'Second' }]}
            />
          </Grid>
          <Grid item xs={7}>
            <Select
              fullWidth
              multiple
              size="small"
              name="select"
              label="Select"
              getOptionLabel={({ label }) => label}
              options={['HI', 'HI1', 'HI2'].map(item => ({ value: item, label: item }))}
            />
          </Grid>
          <Grid item xs={7}>
            <AsyncSelect
              loading
              multiple
              fullWidth
              name="async-select"
              loadingText="LOADING"
              label="Async multiple"
              loadOptions={getRolesMemo}
              getOptionLabel={({ name }) => name}
            />
          </Grid>
          <Grid item xs={7}>
            <FSelect
              fullWidth
              name="fsync"
              label="FSync"
              filterSelectedOptions
              getOptionLabel={({ label }) => label}
              getFieldValue={({ value }: AnyObject) => value}
              prepareValue={(value: AnyObject) => ({ value, label: value })}
              options={['HI', 'HI1', 'HI2'].map(item => ({ value: item, label: item }))}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          </Grid>
          <Grid item xs={7}>
            <FSelect
              fullWidth
              multiple
              label="FSync multiple"
              name="fsyncMultiple"
              filterSelectedOptions
              getFieldValue={value => value}
              getOptionLabel={({ label }) => label}
              prepareValue={(value: AnyObject) => value}
              options={['HI', 'HI1', 'HI2'].map(item => ({ value: item, label: item }))}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          </Grid>
          <Grid item xs={7}>
            <FSelect
              fullWidth
              name="FSyncObj"
              label="FSyncObj"
              getOptionLabel={({ label }) => label}
              getFieldValue={({ value }: AnyObject) => value}
              prepareValue={(value: AnyObject) => ({ value, label: value })}
              options={['HI', 'HI1', 'HI2'].map(item => ({ value: item, label: item }))}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          </Grid>
          <Grid item xs={7}>
            <FAsyncSelect
              fullWidth
              name="async"
              label="Async"
              loadingText="LOADING"
              filterSelectedOptions
              loadOptions={getRolesMemo}
              getFieldValue={({ name }: AnyObject) => name}
              getOptionLabel={option => option.name ? option.name : option}
              prepareValue={(value: AnyObject) => ({ name: value, label: value })}
              isOptionEqualToValue={(option, value) => option.name === value.name}
            />
          </Grid>
          <Grid item xs={7}>
            <FAsyncSelect
              multiple
              fullWidth
              loadingText="LOADING"
              name="fAsyncMultiple"
              label="Async multiple"
              filterSelectedOptions
              loadOptions={getRolesMemo}
              getOptionLabel={option => option.name}
              prepareValue={(value: AnyObject) => value}
              getFieldValue={(value) => value}
              isOptionEqualToValue={(option, value) => option.name === value.name}
            />
          </Grid>
        </Grid>
      </Form> }
    </Formik>
  </Grid>;
};

export default memo(Test);
