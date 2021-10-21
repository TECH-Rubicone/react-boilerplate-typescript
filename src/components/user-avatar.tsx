// outsource dependencies
import React, { memo } from 'react';
import { Avatar } from '@mui/material';
import { AvatarTypeMap } from '@mui/material/Avatar/Avatar';

interface UserAvatarProps extends AvatarTypeMap {
  name: string
  userImg?: string
}

type UserAvatarType = Omit<UserAvatarProps, 'defaultComponent' | 'props'>;

const UserAvatar: React.FC<UserAvatarType> = ({ name, userImg, ...attr }) => {
  const userImage = userImg ?? '';
  const stringAvatar = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  return <Avatar
    alt={name}
    src={userImage}
    sx={{ bgcolor: 'warning.main', fontSize: 14 }}
    {...attr}
  >
    { stringAvatar }
  </Avatar>;
};

export default memo(UserAvatar);
