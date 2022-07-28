import {
  CogIcon,
  HomeIcon,
  KeyIcon,
  PaperAirplaneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TicketIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import {
  AREA_PAGE,
  BUSINESS_PAGE,
  DASHBOARD_PAGE,
  PERMISSIONS_PAGE,
  PRODUCT_PAGE,
  ROLES_PAGE,
  ROLE_ADMIN,
  SALES_PAGE,
  SETTINGS_PAGE,
  TABLE_PAGE,
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
  { name: 'tables', link: TABLE_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  { name: 'products', link: PRODUCT_PAGE, icon: PaperAirplaneIcon, roles: [ROLE_ADMIN] },
  { name: 'business', link: BUSINESS_PAGE, icon: ShieldCheckIcon, roles: [ROLE_ADMIN] },
  { name: 'sales', link: SALES_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ROLE_ADMIN] },
  {
    name: 'access-control',
    icon: KeyIcon,
    children: [
      { name: 'roles', link: ROLES_PAGE, roles: [ROLE_ADMIN] },
      { name: 'permissions', link: PERMISSIONS_PAGE, roles: [ROLE_ADMIN] }
    ],
    roles: [ROLE_ADMIN]
  },
  { name: 'settings', link: SETTINGS_PAGE, icon: CogIcon, roles: [ROLE_ADMIN] }
];
