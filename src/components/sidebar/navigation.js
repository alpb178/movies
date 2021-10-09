import {
  HomeIcon,
  ArchiveIcon,
  UserGroupIcon,
  CogIcon,
  TicketIcon
} from '@heroicons/react/outline';
import {
  DASHBOARD_PAGE,
  PAYMENTS_PAGE,
  REVENUES_PAGE,
  SETTINGS_PAGE,
  USERS_PAGE,
  ADMIN_ROLE
} from 'lib/constants';

export default [
  {
    name: 'dashboard',
    link: DASHBOARD_PAGE,
    icon: HomeIcon,
    roles: [ADMIN_ROLE]
  },
  {
    name: 'revenues',
    icon: ArchiveIcon,
    link: REVENUES_PAGE,
    roles: [ADMIN_ROLE]
  },
  { name: 'payments', link: PAYMENTS_PAGE, icon: TicketIcon, roles: [ADMIN_ROLE] },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ADMIN_ROLE] },
  { name: 'settings', link: SETTINGS_PAGE, icon: CogIcon, roles: [ADMIN_ROLE] }
];
