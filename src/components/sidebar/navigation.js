import {
  ClipboardListIcon,
  CubeIcon,
  HomeIcon,
  ScaleIcon,
  TicketIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import {
  AREA_PAGE,
  CASH_REGISTER_BOX_PAGE,
  COMANDAS_PAGE,
  DASHBOARD_PAGE,
  PRODUCTS_PAGE,
  RECIPES_PAGE,
  ROLE_ADMIN,
  ROLE_OWNER,
  USERS_PAGE
} from 'lib/constants';

export default [
  {
    name: 'dashboard',
    link: DASHBOARD_PAGE,
    icon: HomeIcon,
    roles: [ROLE_ADMIN, ROLE_OWNER]
  },

  { name: 'areas', link: AREA_PAGE, icon: ScaleIcon, roles: [ROLE_ADMIN, ROLE_OWNER] },
  { name: 'products', link: PRODUCTS_PAGE, icon: CubeIcon, roles: [ROLE_ADMIN, ROLE_OWNER] },
  { name: 'recipes', link: RECIPES_PAGE, icon: ClipboardListIcon, roles: [ROLE_ADMIN, ROLE_OWNER] },
  { name: 'comandas', link: COMANDAS_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN, ROLE_OWNER] },
  {
    name: 'cash_register_box',
    link: CASH_REGISTER_BOX_PAGE,
    icon: TicketIcon,
    roles: [ROLE_ADMIN, ROLE_OWNER]
  },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ROLE_ADMIN, ROLE_OWNER] }
];
