import * as ROUTES from 'constants/routes';
import { MENU_TYPE } from './layout/side-menu';
import { AssignmentIndOutlined, FormatListBulletedOutlined, StarBorderOutlined, SupervisorAccountOutlined, VpnKeyOutlined } from '@mui/icons-material';

const MENU = [
  {
    type: MENU_TYPE.HEADER,
    name: 'Menu',
  },
  {
    type: MENU_TYPE.MENU,
    name: 'Auth',
    icon: VpnKeyOutlined,
    isActive: (location: Location) => ROUTES.SIGN_IN.REGEXP.test(location.pathname),
    list: [
      {
        type: MENU_TYPE.LINK,
        name: 'Sign in',
        icon: AssignmentIndOutlined,
        link: ROUTES.SIGN_IN.LINK(),
        isActive: (location: Location) => ROUTES.SIGN_IN.REGEXP.test(location.pathname),
      }
    ]
  },
  {
    type: MENU_TYPE.MENU,
    name: 'Administrative',
    icon: SupervisorAccountOutlined,
    isActive: (location: Location) => ROUTES.ADMINISTRATIVE.REGEXP.test(location.pathname),
    list: [
      {
        type: MENU_TYPE.LINK,
        name: 'Welcome',
        icon: StarBorderOutlined,
        link: ROUTES.WELCOME.LINK(),
        isActive: (location: Location) => ROUTES.WELCOME.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.LINK,
        name: 'List',
        icon: FormatListBulletedOutlined,
        link: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(),
        isActive: (location: Location) => ROUTES.ADMINISTRATIVE_USERS_LIST.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.ACTION,
        name: 'Action',
        icon: FormatListBulletedOutlined,
        action: () => console.log('I am an action'),
        isActive: (location: Location) => false,
      },
    ],
  },
];

export default MENU;
