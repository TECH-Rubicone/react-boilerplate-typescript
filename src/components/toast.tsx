// outsource dependencies
import React, { FC } from 'react';
import { IUser } from '../layouts/controller';
import { Col, Container, Row } from 'reactstrap';
import { toast, ToastOptions, UpdateOptions, Zoom } from 'react-toastify';

// local dependencies
import * as ROUTES from 'constants/routes';

// services
import _ from 'services/lodash.service';

interface CustomToastProps {
    user: IUser
}

const TOAST_ID = 'TOAST_ID';
const updateToastOptions: UpdateOptions = {
  autoClose: 1000,
  theme: 'colored',
  transition: Zoom,
  className: 'bg-success text-white animate__animated animate__flipInY animated',
  render: () => <div>
    <h4>Welcome</h4>
    <p>We are really glad to see you!</p>
  </div>
};

const toastOptions: ToastOptions = {
  delay: 500,
  theme: 'light',
  autoClose: false,
  toastId: TOAST_ID,
  closeOnClick: false,
  transition: Zoom,
  onClick: () => {
    ROUTES.APP.PUSH();
    toast.update(TOAST_ID, updateToastOptions);
  }
};

export const dismissToast = () => toast.dismiss(TOAST_ID);

export const showCustomToast = (user: IUser) => {
  toast(<CustomToast user={user}/>, toastOptions);
};

const CustomToast: FC<CustomToastProps> = ({ user }) => {
  return <Container fluid className="rotateY animated">
    <Row>
      <Col xs="5">
        <img className="img-fluid" src={_.get(user, 'coverImage.url')} alt={_.get(user, 'name')}/>
      </Col>
      <Col xs="7">
        <h5>Welcome</h5>
        <p> {_.get(user, 'name')}</p>
      </Col>
    </Row>
  </Container>;
};

