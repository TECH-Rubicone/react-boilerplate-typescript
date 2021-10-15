// outsource dependencies
import { Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import { AddAPhoto, PersonOutline } from '@mui/icons-material';
import { Fab, Button, Typography, Grid, Paper } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';

// services
import { NEW_ID } from 'services/route';

// local dependencies
import FInput from 'components/input';
import { controller } from './controller';

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
  console.log('Img:', imgUrl);
  if (!isControllerSubscribed && !initialized) {
    return <h1>Preloader</h1>;
  }
  return <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
  >
    <Form>
      <Grid container spacing={2} className="py-3">
        <Grid item xs={12}>
          <Typography variant="h3">{ id === NEW_ID ? 'Create' : 'Edit' } User</Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className="p-3" elevation={3}>
            <FInput
              type="text"
              name="firstName"
              placeholder="First Name"
              label={<strong className="required-asterisk"> First Name </strong>}
            />
            <FInput
              type="text"
              name="middleName"
              placeholder="Middle Name"
              label={<strong className="required-asterisk"> Middle Name </strong>}
            />
            <FInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              label={<strong className="required-asterisk"> Last Name </strong>}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="p-3" elevation={3}>
            <FInput
              type="file"
              value={imgUrl}
              accept="image/*"
              name="coverImage"
              id="contained-button-file"
              onChange={handleImageChange}
              cssModule={{ 'form-control-file': 'invisible' }}
              label={<Fab component="span" color="primary">
                <AddAPhoto />
              </Fab>}
            />
            { imgUrl
              ? <img src={imgUrl} width={100}/>
              : <PersonOutline/> }
          </Paper>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" disabled={disabled}>
        Submit
      </Button>
    </Form>
  </Formik>;
};
export default memo(UserEdit);
