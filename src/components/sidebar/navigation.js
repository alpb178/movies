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
  USERS_PAGE
} from 'lib/constants';

export default [
  {
    name: 'dashboard',
    link: DASHBOARD_PAGE,
    icon: HomeIcon,
    roles: [ROLE_ADMIN]
  },

  { name: 'areas', link: AREA_PAGE, icon: ScaleIcon, roles: [ROLE_ADMIN] },
  { name: 'products', link: PRODUCTS_PAGE, icon: CubeIcon, roles: [ROLE_ADMIN] },
  { name: 'recipes', link: RECIPES_PAGE, icon: ClipboardListIcon, roles: [ROLE_ADMIN] },
  { name: 'comandas', link: COMANDAS_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  {
    name: 'cash_register_box',
    link: CASH_REGISTER_BOX_PAGE,
    icon: TicketIcon,
    roles: [ROLE_ADMIN]
  },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ROLE_ADMIN] }
];
