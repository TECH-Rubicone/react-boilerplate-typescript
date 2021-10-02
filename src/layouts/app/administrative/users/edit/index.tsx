// outsource dependencies
import { useParams } from 'react-router-dom';
import { AddAPhoto } from '@mui/icons-material';
import { useController } from 'redux-saga-controller';
import { Formik, Form, useField, FormikProps } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Container, Box, Fab, Button, Typography, Grid, Card, CardActionArea, Avatar } from '@mui/material';

// services
import _ from 'services/lodash.service';
// local dependencies
import { NEW_ID } from 'services/route';
import { controller, UserInfo } from './controller';
import FInput from 'components/input';

const UserEdit = () => {
  const { id }: {id: string} = useParams();
  const [
    { initialized, errorMessage, disabled, initialValues },
    { initialize, updateCtrl, clearCtrl, updateData },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize({ id });
    return () => {
      clearCtrl();
    };
  }, [initialize, clearCtrl, id]);
  const [imgUrl, setImgUrl] = useState('');
  // NOTE Actions page
  const onSubmit = useCallback(values => {
    updateData(values);
  }, [updateData]);
  const handleImageChange = useCallback(event => {
    if (event.target.files && event.target.files.length > 0) {
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  }, []);
  if (!isControllerSubscribed && !initialized) {
    return <h1>Preloader</h1>;
  }
  return <Container>
    <Box sx={{ py: 3 }}>
      <Grid>
        <Typography variant="h3">{ id === NEW_ID ? 'Create' : 'Edit' } User</Typography>
      </Grid>
      <Grid item>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Form>
            <FInput
              type="text"
              name="username"
              placeholder="Email Address"
              label={<strong className="required-asterisk"> Email Address </strong>}
            />
            <FInput
              type="file"
              accept="image/*"
              name="coverImage"
              id="contained-button-file"
              onChange={handleImageChange}
              cssModule={{ 'form-control-file': 'd-none' }}
              label={<Fab component="span" color="primary">
                <AddAPhoto />
              </Fab>}
            />
            <Card>
              <img src={imgUrl}/>
            </Card>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
          </Form>
        </Formik>
      </Grid>
    </Box>
  </Container>;
};
export default memo(UserEdit);
