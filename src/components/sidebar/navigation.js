import {
  HomeIcon,
  // ArchiveIcon,
  UserGroupIcon,
  CogIcon,
  TicketIcon,
  PaperAirplaneIcon,
  LocationMarkerIcon,
  ScaleIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/outline';
import {
  DASHBOARD_PAGE,
  PAYMENTS_PAGE,
  // REVENUES_PAGE,
  SETTINGS_PAGE,
  REGULATIONS_PAGE,
  SHIPMENT_ITEMS_PAGE,
  USERS_PAGE,
  ADMIN_ROLE,
  TRAVELS_PAGE,
  AIRLINES_PAGE,
  COUNTRIES_PAGE,
  REGIONS_PAGE,
  MEASURE_UNITS_PAGE
} from 'lib/constants';

export default [
  {
    name: 'dashboard',
    link: DASHBOARD_PAGE,
    icon: HomeIcon,
    roles: [ADMIN_ROLE]
  },
  // {
  //   name: 'revenues',
  //   icon: ArchiveIcon,
  //   link: REVENUES_PAGE,
  //   roles: [ADMIN_ROLE]
  // },
  { name: 'payments', link: PAYMENTS_PAGE, icon: CurrencyDollarIcon, roles: [ADMIN_ROLE] },
  { name: 'travels', link: TRAVELS_PAGE, icon: TicketIcon, roles: [ADMIN_ROLE] },
  { name: 'regulations', link: REGULATIONS_PAGE, icon: ShieldCheckIcon, roles: [ADMIN_ROLE] },
  { name: 'shipment-items', link: SHIPMENT_ITEMS_PAGE, icon: TicketIcon, roles: [ADMIN_ROLE] },
  { name: 'measure-units', link: MEASURE_UNITS_PAGE, icon: ScaleIcon, roles: [ADMIN_ROLE] },
  { name: 'airlines', link: AIRLINES_PAGE, icon: PaperAirplaneIcon, roles: [ADMIN_ROLE] },
  {
    name: 'locations',
    children: [
      { name: 'countries', link: COUNTRIES_PAGE, roles: [ADMIN_ROLE] },
      { name: 'regions', link: REGIONS_PAGE, roles: [ADMIN_ROLE] }
    ],
    icon: LocationMarkerIcon,
    roles: [ADMIN_ROLE]
  },
  { name: 'users', link: USERS_PAGE, icon: UserGroupIcon, roles: [ADMIN_ROLE] },
  { name: 'settings', link: SETTINGS_PAGE, icon: CogIcon, roles: [ADMIN_ROLE] }
];
