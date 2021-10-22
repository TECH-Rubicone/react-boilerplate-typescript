// outsource dependencies
import React, { memo } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

// local dependencies
import { Me } from '../layouts/controller';

interface UserAvatarProps extends AvatarProps {
  user: Me
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...attr }) => {
  const lastName = user?.lastName ?? '_';
  const firstName = user?.firstName ?? '_';
  const stringAvatar = `${firstName[0]}${lastName[0]}`;
  return <Avatar
    alt={user?.name}
    src={user?.coverImage.url}
    sx={{ bgcolor: 'warning.main', fontSize: 14 }}
    {...attr}
  >
    { stringAvatar }
  </Avatar>;
};

export default memo(UserAvatar);
