// outsource dependencies
import { Person, Settings } from '@mui/icons-material';

// constants
import * as ROUTES from 'constants/routes';

const MENU = [
  {
    icon: Person,
    description: 'Profile',
    link: ROUTES.ADMINISTRATIVE_USER_PROFILE.LINK(),
  },
  {
    icon: Settings,
    description: 'Settings',
    link: ROUTES.ADMINISTRATIVE_USER_SETTINGS.LINK(),
  },
];

export default MENU;
