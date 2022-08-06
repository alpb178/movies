import {
  HomeIcon,
  PaperAirplaneIcon,
  ScaleIcon,
  TicketIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import {
  AREA_PAGE,
  CASH_REGISTER_BOX_PAGE,
  DASHBOARD_PAGE,
  PRODUCT_PAGE,
  ROLE_ADMIN,
  SALES_PAGE,
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
  { name: 'products', link: PRODUCT_PAGE, icon: PaperAirplaneIcon, roles: [ROLE_ADMIN] },
  { name: 'sales', link: SALES_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  {
    name: 'cash_register_box',
    link: CASH_REGISTER_BOX_PAGE,
    icon: TicketIcon,
    roles: [ROLE_ADMIN]
  },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ROLE_ADMIN] }
];
