// outsource dependencies
import React, { FC } from 'react';
import { toast, ToastOptions, UpdateOptions } from 'react-toastify';

// constants
import * as ROUTES from 'constants/routes';

// services
import _ from 'services/lodash.service';

// local dependencies
import { Me } from '../layouts/controller';

interface WelcomeToastProps {
    user: Me
}

const TOAST_ID = 'RESTORE_SESSION';
const updateToastOptions: UpdateOptions = {
  autoClose: 1000,
  theme: 'colored',
  className: 'bg-success text-white',
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
  onClick: () => {
    ROUTES.APP.PUSH();
    toast.update(TOAST_ID, updateToastOptions);
  }
};

export const dismissToast = () => toast.dismiss(TOAST_ID);

export const showWelcomeToast = (user: Me) => {
  toast(<WelcomeToast user={user}/>, toastOptions);
};

const WelcomeToast: FC<WelcomeToastProps> = ({ user }) => {
  return <div className="rotateY">
    <img className="img-fluid" src={_.get(user, 'coverImage.url')} alt={_.get(user, 'name')}/>
    <h5>Welcome</h5>
    <p> { user?.name }</p>
  </div>;
};

