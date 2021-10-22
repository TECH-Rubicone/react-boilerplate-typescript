// outsource dependencies
import { Dangerous, FormatListBulletedOutlined, StarBorderOutlined, SupervisorAccountOutlined, VpnKeyOutlined } from '@mui/icons-material';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import { MenuItem } from './layout';
import { MENU_TYPE } from './layout/side-menu';

const MENU = [
  {
    type: MENU_TYPE.HEADER,
    name: 'menu.menu',
  },
  {
    type: MENU_TYPE.LINK,
    name: 'menu.test',
    icon: Dangerous,
    link: ROUTES.TEST.LINK(),
    isActive: location => ROUTES.TEST.REGEXP.test(location?.pathname),
  },
  {
    type: MENU_TYPE.LINK,
    name: 'menu.auth',
    icon: VpnKeyOutlined,
    link: ROUTES.SIGN_IN.LINK(),
    isActive: location => ROUTES.SIGN_IN.REGEXP.test(location.pathname),
  },
  {
    type: MENU_TYPE.MENU,
    name: 'menu.administrative',
    icon: SupervisorAccountOutlined,
    isActive: location => ROUTES.ADMINISTRATIVE.REGEXP.test(location.pathname),
    list: [
      {
        type: MENU_TYPE.LINK,
        name: 'menu.welcome',
        icon: StarBorderOutlined,
        link: ROUTES.WELCOME.LINK(),
        isActive: location => ROUTES.WELCOME.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.LINK,
        name: 'menu.users',
        icon: FormatListBulletedOutlined,
        link: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(),
        isActive: location => ROUTES.ADMINISTRATIVE_USERS_LIST.REGEXP.test(location.pathname),
      },
      {
        type: MENU_TYPE.ACTION,
        name: 'menu.action',
        icon: FormatListBulletedOutlined,
        action: () => console.log('I am an action'),
        isActive: location => false,
      },
    ],
  },
  // {
  //   type: MENU_TYPE.MENU,
  //   name: 'Client',
  //   icon: SupervisorAccountOutlined,
  //   isActive: location => ROUTES.CLIENT.REGEXP.test(location.pathname),
  //   list: [
  //     {
  //       type: MENU_TYPE.LINK,
  //       name: 'Supplements',
  //       icon: StarBorderOutlined,
  //       link: ROUTES.CLIENT_DSLD_SUPPLEMENTS.LINK(),
  //       isActive: location => ROUTES.CLIENT_DSLD_SUPPLEMENTS.REGEXP.test(location.pathname),
  //     },
  //     {
  //       type: MENU_TYPE.LINK,
  //       name: 'Ingredients',
  //       icon: FormatListBulletedOutlined,
  //       link: ROUTES.CLIENT_DSLD_INGREDIENTS.LINK(),
  //       isActive: location => ROUTES.CLIENT_DSLD_INGREDIENTS.REGEXP.test(location.pathname),
  //     },
  //   ],
  // },
] as Array<MenuItem>;

export default MENU;
