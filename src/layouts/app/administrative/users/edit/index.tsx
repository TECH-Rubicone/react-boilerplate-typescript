// outsource dependencies
import { Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, Divider, Box, CardHeader } from '@mui/material';

// services
import { NEW_ID } from 'services/route';
import { instanceAPI } from 'services/api-private.service';

// components
import FInput from 'components/forms/input';
import FSelect, { FAsyncSelect } from 'components/fselect';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { controller } from './controller';

interface PageFullRoleDto {
  size: number
  offset: number
  pageNumber: number
  totalPages: number
  totalElements: number
  content: Array<FullRoleDto>
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
      data,
      params,
    }
  );
}

const UserEdit = () => {
  const { id }: {id: string} = useParams();
  const [
    { initialized, disabled, initialValues },
    { initialize, clearCtrl, updateData },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize({ id });
    return () => {
      clearCtrl();
    };
  }, [initialize, clearCtrl, id]);
  // NOTE Actions page
  const onSubmit = useCallback(values => {
    updateData(values);
  }, [updateData]);

  const getRolesMemo = useCallback(
    () => getRoles({ data: null, params: { size: 15, page: 0 } }).then(({ content }) => content),
    []
  );
  if (!isControllerSubscribed && !initialized) {
    return <h1>Preloader</h1>;
  }

  return <Formik
    enableReinitialize
    onSubmit={onSubmit}
    initialValues={initialValues}
  >
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">{ id === NEW_ID ? 'Create' : 'Edit' } User</Typography>
        </Grid>
        <Grid item container direction="column" xs={6}>
          <Grid item mb={2}>
            <Card>
              <CardHeader title={<Typography variant="h4">Main</Typography>} />
              <Divider />
              <CardContent>
                <Box>
                  <FInput
                    required
                    type="text"
                    size="small"
                    name="firstName"
                    label={<strong>First Name</strong>}
                  />
                </Box>
                <Box pt={2}>
                  <FInput
                    type="text"
                    size="small"
                    name="middleName"
                    label={<strong>Middle Name</strong>}
                  />
                </Box>
                <Box pt={2}>
                  <FInput
                    required
                    type="text"
                    size="small"
                    name="lastName"
                    label={<strong>Last Name</strong>}
                  />
                </Box>
                <Box pt={2}>
                  <FSelect
                    fullWidth
                    required
                    size="small"
                    name="suffix"
                    label={<strong>Suffix</strong>}
                    getFieldValue={(({ value }: AnyObject) => value)}
                    prepareValue={(value: string | number) => ({ value, label: value })}
                    options={['Jr.', 'Sr.', '2nd', '3rd', 'II', 'III', 'IV', 'V'].map(option => ({ value: option, label: option }))}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader title={<Typography variant="h4">Role</Typography>} />
              <Divider />
              <CardContent>
                <Box>
                  <FAsyncSelect
                    multiple
                    required
                    fullWidth
                    size="small"
                    name="roles"
                    loadingText="LOADING"
                    filterSelectedOptions
                    loadOptions={getRolesMemo}
                    label={<strong>Roles</strong>}
                    getOptionLabel={({ name }) => name}
                    prepareValue={(value: AnyObject) => value}
                    getFieldValue={(value) => value}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                  />
                </Box>
                <Box mt={2}>
                  <FInput
                    required
                    type="text"
                    size="small"
                    name="email"
                    label={<strong>Last Name</strong>}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Button type="submit" variant="contained" color="success" disabled={disabled}>
          Save
        </Button>
      </Box>
    </Form>
  </Formik>;
};
export default memo(UserEdit);
