// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';
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
import { getItemName, prepareValue, getItem } from 'constants/extractors';

// hooks
import useFreeHeight from 'hooks/use-free-height';

// interfaces
import { AnyObject } from 'interfaces/common';
import { PageFullRoleDto } from 'interfaces/api';

// local dependencies
import { controller } from './controller';

const prefixOptions = ['Jr.', 'Sr.', '2nd', '3rd', 'II', 'III', 'IV', 'V'];

const UserEdit = () => {
  const { id } = useParams<{id: string}>();
  const [
    { initialized, disabled, initialValues },
    { initialize, clearCtrl, updateData },
    isControllerSubscribed
  ] = useController(controller);

  const validationSchema = useMemo(() => yup.object().shape({
    firstName: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD'),
    middleName: yup.string()
      .nullable(),
    roles: yup.array()
      .min(1),
    lastName: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD'),
    email: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .email('VALIDATION_ERROR.INVALID_EMAIL'),
    prefix: yup.string()
      .nullable(),
    suffix: yup.string()
      .nullable(),
  }), []);

  const prefixes = useMemo(() => prefixOptions.map((option: string) => ({ value: option, label: option })), []);
  const suffixes = useMemo(() => prefixOptions.map((option: string) => ({ value: option, label: option })), []);

  const freeHeight = useFreeHeight();
  const contentHeight = freeHeight
    - 64 // top margin
    - 16; // button bottom margin

  useEffect(() => {
    initialize({ id });
    return () => { clearCtrl(); };
  }, [initialize, clearCtrl, id]);
  // NOTE Actions page
  const onSubmit = useCallback(values => { updateData(values); }, [updateData]);

  const getRolesMemo = useCallback(
    () => instanceAPI.post<PageFullRoleDto, PageFullRoleDto>(
      'admin-service/roles/filter',
      {
        data: null,
        params: { size: 15, page: 0 },
      }
    ).then(({ content }) => content),
    []
  );

  const isOptionEqualToValue = useMemo(() => (option: AnyObject, value: AnyObject) => option.name === value.name, []);

  const isEditId = id !== NEW_ID;
  const isEditPage = isEditId ? 'Edit' : 'Create';

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
              <Typography variant="h3">{ isEditPage } User</Typography>
            </Grid>
            <Grid item container xs={12} spacing={3} justifyContent="center" alignContent="center" sx={{ height: contentHeight }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title={<Typography variant="h4">Name</Typography>} />
                  <Divider />
                  <CardContent>
                    <Stack spacing={2}>
                      <FInput
                        required
                        fullWidth
                        type="text"
                        size="small"
                        name="firstName"
                        label={<strong>First Name</strong>}
                      />
                      <FInput
                        required
                        fullWidth
                        type="text"
                        size="small"
                        name="lastName"
                        label={<strong>Last Name</strong>}
                      />
                      { isEditId && <>
                        <FInput
                          fullWidth
                          type="text"
                          size="small"
                          name="middleName"
                          label={<strong>Middle Name</strong>}
                        />
                        <FInput
                          fullWidth
                          type="text"
                          size="small"
                          name="username"
                          label={<strong>User Name</strong>}
                        />
                      </> }
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title={<Typography variant="h4">Role</Typography>} />
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
                        prepareValue={getItem}
                        getFieldValue={getItem}
                        loadOptions={getRolesMemo}
                        getOptionLabel={getItemName}
                        label={<strong>Roles</strong>}
                        isOptionEqualToValue={isOptionEqualToValue}
                      />
                      <FInput
                        fullWidth
                        type="text"
                        size="small"
                        name="email"
                        required={!isEditId}
                        label={<strong>Email</strong>}
                      />
                      { isEditId && <>
                        <FDatePicker
                          inputFormat="L"
                          name="createdDate"
                          label="Creation Date"
                        />
                        <FSelect
                          fullWidth
                          size="small"
                          name="prefix"
                          options={prefixes}
                          getFieldValue={getItem}
                          prepareValue={prepareValue}
                          label={<strong>Prefix</strong>}
                        />
                        <FSelect
                          fullWidth
                          size="small"
                          name="suffix"
                          options={suffixes}
                          getFieldValue={getItem}
                          prepareValue={prepareValue}
                          label={<strong>Suffix</strong>}
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
              { isEditPage }
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  </Preloader>;
};
export default memo(UserEdit);
