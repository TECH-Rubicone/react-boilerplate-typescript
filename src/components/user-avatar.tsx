// outsource dependencies
import React, { memo } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

type Permission = {
  id: number;
  name: string;
};

type Role = {
  id: number;
  name: string;
}

type Image = {
  url: string;
}

export type User = null | {
  id: number;
  name: string;
  roles: Role[];
  username: string;
  enabled: boolean;
  coverImage: Image;
  lastName?: string;
  firstName?: string;
  clinicRole: string;
  createdDate: string;
  hasDrChronoToken: boolean;
  permissions: Permission[];
}

interface UserAvatarProps extends AvatarProps {
  user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...attr }) => {
  const stringAvatar = `${user?.name.split(' ')[0][0]}${user?.name.split(' ')[1][0]}`;
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
