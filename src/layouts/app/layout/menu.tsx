// outsource dependencies
import { Person, Settings } from '@mui/icons-material';

// constants
import * as ROUTES from 'constants/routes';

const MENU = [
  {
    icon: Person,
    description: 'Profile',
    link: ROUTES.ADMINISTRATIVE_PROFILE_INFO.LINK(),
  },
  {
    icon: Settings,
    description: 'Settings',
    link: ROUTES.ADMINISTRATIVE_PROFILE_SETTINGS.LINK(),
  },
];

export default MENU;
