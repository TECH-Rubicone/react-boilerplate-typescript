// outsource dependencies
import React, { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface AlertErrorProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

const AlertError: FC<AlertErrorProps> = ({ title, children, onClose }) => {
  return <Alert severity="error" onClose={onClose}>
    <AlertTitle>{ title }</AlertTitle>
    { children }
  </Alert>;
};

export default AlertError;
