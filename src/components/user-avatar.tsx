// outsource dependencies
import React, { memo } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

interface UserAvatarProps extends AvatarProps {
  lastName: string
  firstName: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName, ...attr }) => {
  const userLastName = lastName ?? '_';
  const userFirstName = firstName ?? '_';
  const stringAvatar = `${userFirstName[0]}${userLastName[0]}`;
  return <Avatar
    alt={stringAvatar}
    sx={{ bgcolor: 'warning.main', fontSize: 14 }}
    {...attr}
  >
    { stringAvatar }
  </Avatar>;
};

export default memo(UserAvatar);
