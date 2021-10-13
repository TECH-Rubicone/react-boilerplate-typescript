// outsource dependencies
import { FormatListBulletedOutlined, StarBorderOutlined, SupervisorAccountOutlined, VpnKeyOutlined } from '@mui/icons-material';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import { MenuItem } from './layout';
import { MENU_TYPE } from './layout/side-menu';

const MENU = [
  {
    type: MENU_TYPE.HEADER,
    name: 'Menu',
  },
  {
    type: MENU_TYPE.LINK,
    name: 'Test',
    icon: VpnKeyOutlined,
    link: ROUTES.TEST.LINK(),
    isActive: location => ROUTES.TEST.REGEXP.test(location?.pathname),
  },
  {
    type: MENU_TYPE.MENU,
    name: 'Auth',
    icon: VpnKeyOutlined,
    isActive: location => ROUTES.SIGN_IN.REGEXP.test(location.pathname),
    list: []
  },
  {
    type: MENU_TYPE.MENU,
    name: 'Administrative',
    icon: SupervisorAccountOutlined,
    isActive: location => ROUTES.ADMINISTRATIVE.REGEXP.test(location.pathname),
    list: [
      {
        type: MENU_TYPE.LINK,
        name: 'Welcome',
        icon: StarBorderOutlined,
        link: ROUTES.WELCOME.LINK(),
        isActive: location => ROUTES.WELCOME.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.LINK,
        name: 'List',
        icon: FormatListBulletedOutlined,
        link: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(),
        isActive: location => ROUTES.ADMINISTRATIVE_USERS_LIST.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.ACTION,
        name: 'Action',
        icon: FormatListBulletedOutlined,
        action: () => console.log('I am an action'),
        isActive: location => false,
      },
    ],
  },
  {
    type: MENU_TYPE.MENU,
    name: 'Client',
    icon: SupervisorAccountOutlined,
    isActive: location => ROUTES.CLIENT.REGEXP.test(location.pathname),
    list: [
      {
        type: MENU_TYPE.LINK,
        name: 'Supplements',
        icon: StarBorderOutlined,
        link: ROUTES.CLIENT_DSLD_SUPPLEMENTS.LINK(),
        isActive: location => ROUTES.CLIENT_DSLD_SUPPLEMENTS.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.LINK,
        name: 'Ingredients',
        icon: FormatListBulletedOutlined,
        link: ROUTES.CLIENT_DSLD_INGREDIENTS.LINK(),
        isActive: location => ROUTES.CLIENT_DSLD_INGREDIENTS.REGEXP.test(location.pathname),
      },
    ],
  },
] as Array<MenuItem>;

export default MENU;
