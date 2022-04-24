import {
  BriefcaseIcon,
  CogIcon,
  HomeIcon,
  KeyIcon,
  LocationMarkerIcon,
  PaperAirplaneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TicketIcon,
  // ArchiveIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import {
  AIRLINES_PAGE,
  COUNTRIES_PAGE,
  DASHBOARD_PAGE,
  MEASURE_UNITS_PAGE,
  REGIONS_PAGE,
  REGULATIONS_PAGE,
  ROLES_PAGE,
  ROLE_ADMIN,
  // REVENUES_PAGE,
  SETTINGS_PAGE,
  SHIPMENTS_PAGE,
  SHIPMENT_ITEMS_PAGE,
  TRAVELS_PAGE,
  USERS_PAGE
} from 'lib/constants';

export default [
  {
    name: 'dashboard',
    link: DASHBOARD_PAGE,
    icon: HomeIcon,
    roles: [ROLE_ADMIN]
  },
  // {
  //   name: 'revenues',
  //   icon: ArchiveIcon,
  //   link: REVENUES_PAGE,
  //   roles: [ROLE_ADMIN]
  // },
  {
    name: 'locations',
    children: [
      { name: 'countries', link: COUNTRIES_PAGE, roles: [ROLE_ADMIN] },
      { name: 'regions', link: REGIONS_PAGE, roles: [ROLE_ADMIN] }
    ],
    icon: LocationMarkerIcon,
    roles: [ROLE_ADMIN]
  },
  { name: 'measure-units', link: MEASURE_UNITS_PAGE, icon: ScaleIcon, roles: [ROLE_ADMIN] },
  { name: 'shipment-items', link: SHIPMENT_ITEMS_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  { name: 'airlines', link: AIRLINES_PAGE, icon: PaperAirplaneIcon, roles: [ROLE_ADMIN] },
  { name: 'regulations', link: REGULATIONS_PAGE, icon: ShieldCheckIcon, roles: [ROLE_ADMIN] },
  { name: 'travels', link: TRAVELS_PAGE, icon: TicketIcon, roles: [ROLE_ADMIN] },
  { name: 'shipments', link: SHIPMENTS_PAGE, icon: BriefcaseIcon, roles: [ROLE_ADMIN] },
  // { name: 'payments', link: PAYMENTS_PAGE, icon: CurrencyDollarIcon, roles: [ROLE_ADMIN] },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ROLE_ADMIN] },
  { name: 'roles', link: ROLES_PAGE, icon: KeyIcon, roles: [ROLE_ADMIN] },
  { name: 'settings', link: SETTINGS_PAGE, icon: CogIcon, roles: [ROLE_ADMIN] }
];
