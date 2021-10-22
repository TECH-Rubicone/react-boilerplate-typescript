// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Button, Typography, Grid, Card, CardContent, Divider, Box, CardHeader, Stack } from '@mui/material';

// services
import { NEW_ID } from 'services/route';
import { instanceAPI } from 'services/api-private.service';

// components
import FInput from 'components/forms/input';
import Preloader from 'components/preloader';
import FDatePicker from 'components/form-date-picker';
import FSelect, { FAsyncSelect } from 'components/fselect';

// constants
import { getItemName, prepareValue, getItem, getItemValue } from 'constants/extractors';

// hooks
import useFreeHeight from 'hooks/use-free-height';

// interfaces
import { Params } from 'interfaces/routes';
import { FullRoleDto } from 'interfaces/api';
import { AnyObject } from 'interfaces/common';
import { Pagination } from 'interfaces/pagination';

// local dependencies
import { controller } from './controller';

// configure
const prefixes = ['Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Sir', 'Dr', 'Lady', 'Lord'].map(option => ({ value: option, label: option }));
const suffixes = ['Jr.', 'Sr.', '2nd', '3rd', 'II', 'III', 'IV', 'V'].map(option => ({ value: option, label: option }));

const getRoles = (search: string) => instanceAPI.post<Pagination<FullRoleDto>, Pagination<FullRoleDto>>(
  'admin-service/roles/filter',
  {
    data: { name: search },
    params: { size: 15, page: 0 },
  }
).then(({ content }) => content);

const isOptionEqualToValue = (option: AnyObject, value: AnyObject) => option.name === value.name;

const UserEdit = () => {
  const { id } = useParams<Params>();
  const [
    { initialized, disabled, initialValues },
    { initialize, clearCtrl, updateData },
    isControllerSubscribed
  ] = useController(controller);
  const { t } = useTranslation();

  const validationSchema = useMemo(() => yup.object().shape({
    firstName: yup.string()
      .nullable()
      .required('VALIDATION_ERROR.REQUIRED_FIELD'),
    lastName: yup.string()
      .nullable()
      .required('VALIDATION_ERROR.REQUIRED_FIELD'),
    middleName: yup.string()
      .nullable(),
    roles: yup.array()
      .min(1),
    email: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .email('VALIDATION_ERROR.INVALID_EMAIL'),
    prefix: yup.string()
      .nullable(),
    suffix: yup.string()
      .nullable(),
  }), []);

  const freeHeight = useFreeHeight();
  const contentHeight = freeHeight
    - 64 // mt
    - 16; // button mb

  useEffect(() => {
    initialize({ id });
    return () => { clearCtrl(); };
  }, [initialize, clearCtrl, id]);
  // NOTE Actions page
  const onSubmit = useCallback(values => { updateData(values); }, [updateData]);

  return <Preloader active={isControllerSubscribed && !initialized}>
    <Box>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form noValidate>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3">{ id === NEW_ID ? t('EDIT.general.create-title') : t('EDIT.general.edit-title') }</Typography>
            </Grid>
            <Grid item container xs={12} spacing={3} justifyContent="center" alignContent="center" sx={{ height: contentHeight }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title={<Typography variant="h4">{ t('EDIT.general.name') }</Typography>} />
                  <Divider />
                  <CardContent>
                    <Stack spacing={2}>
                      <FInput
                        required
                        fullWidth
                        type="text"
                        size="small"
                        name="firstName"
                        label={<strong>{ t('forms.label.firstName') }</strong>}
                      />
                      <FInput
                        required
                        fullWidth
                        type="text"
                        size="small"
                        name="lastName"
                        label={<strong>{ t('forms.label.lastName') }</strong>}
                      />
                      { id !== NEW_ID && <>
                        <FInput
                          fullWidth
                          type="text"
                          size="small"
                          name="middleName"
                          label={<strong>{ t('forms.label.middleName') }</strong>}
                        />
                        <FInput
                          fullWidth
                          type="text"
                          size="small"
                          name="username"
                          label={<strong>{ t('forms.label.username') }</strong>}
                        />
                      </> }
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title={<Typography variant="h4">{ t('EDIT.general.role') }</Typography>} />
                  <Divider />
                  <CardContent>
                    <Stack spacing={2}>
                      <FAsyncSelect
                        multiple
                        required
                        fullWidth
                        size="small"
                        name="roles"
                        loadingText="LOADING"
                        filterSelectedOptions
                        loadOptions={getRoles}
                        prepareValue={getItem}
                        getFieldValue={getItem}
                        getOptionLabel={getItemName}
                        label={<strong>{ t('forms.label.roles') }</strong>}
                        isOptionEqualToValue={isOptionEqualToValue}
                      />
                      <FInput
                        fullWidth
                        type="text"
                        size="small"
                        name="email"
                        required={id === NEW_ID}
                        label={<strong>{ t('forms.label.email') }</strong>}
                      />
                      { id !== NEW_ID && <>
                        <FDatePicker
                          inputFormat="L"
                          name="createdDate"
                          label={t('forms.label.createdDate')}
                        />
                        <FSelect
                          fullWidth
                          size="small"
                          name="prefix"
                          options={prefixes}
                          prepareValue={prepareValue}
                          getFieldValue={getItemValue}
                          label={<strong>{ t('forms.label.prefix') }</strong>}
                        />
                        <FSelect
                          fullWidth
                          size="small"
                          name="suffix"
                          options={suffixes}
                          prepareValue={prepareValue}
                          getFieldValue={getItemValue}
                          label={<strong>{ t('forms.label.suffix') }</strong>}
                        />
                      </> }
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="success" disabled={disabled}>
              { id === NEW_ID ? t('EDIT.actions.create') : t('EDIT.actions.edit') }
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  </Preloader>;
};
export default memo(UserEdit);
