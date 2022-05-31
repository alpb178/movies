export const APP_NAME = 'Zendinit';

export const DEFAULT_PAGE_SIZE = 10;

export const NAVBAR_HEIGHT = 64; // in pixels

export const TOKEN_KEY = 'access-token';
export const API_REFRESH_TOKEN_URL = '/token'; // Refresh token action
export const API_LOGIN_URL = '/auth/login'; // Login endpoint
export const API_USERS_URL = '/users'; // User endpoint
export const API_AIRLINES_URL = '/airlines';
export const API_COUNTRIES_URL = '/countries';
export const API_FLIGHTS_URL = '/flights';
export const API_MEASURE_UNITS_URL = '/measure-units';
export const API_PAYMENTS_URL = '/payments';
export const API_PERMISSIONS_URL = '/permissions';
export const API_REGIONS_URL = '/regions';
export const API_REGULATIONS_URL = '/regulations';
export const API_RESOURCES_URL = '/resources';
export const API_ROLES_URL = '/roles';
export const API_SHIPMENT_ITEMS_URL = '/shipment-items';
export const API_SHIPMENTS_URL = '/shipments';
export const API_TRAVELS_URL = '/travels';

// App Routes
export const LOGIN_PAGE = '/login';
export const HOME_PAGE = '/';
export const AIRLINES_PAGE = '/airlines';
export const COUNTRIES_PAGE = '/locations/countries';
export const DASHBOARD_PAGE = '/dashboard';
export const MEASURE_UNITS_PAGE = '/measure-units';
export const PAYMENTS_PAGE = '/payments';
export const PERMISSIONS_PAGE = '/permissions';
export const REGIONS_PAGE = '/locations/regions';
export const REGULATIONS_PAGE = '/regulations';
export const REVENUES_PAGE = '/revenues';
export const ROLES_PAGE = '/roles';
export const SETTINGS_PAGE = '/settings';
export const SHIPMENT_ITEMS_PAGE = '/shipment-items';
export const SHIPMENTS_PAGE = '/shipments';
export const TRAVELS_PAGE = '/travels';
export const PAYLOADS_PAGE = '/payloads';

export const TRAVEL_DETAILS_PAGE = (value) => `${TRAVELS_PAGE}/detail/${value}`;
export const TRAVEL_FORM_PAGE = (value) => `${TRAVELS_PAGE}/${value}`;

// HTTP Methods
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// Roles
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

// Users
export const GET_USER_KEY = 'getUsers';
export const USER_DETAIL_PAGE = (id) => `/users/${id}`;
export const USER_FORM_PAGE = (id) => (id ? `/users/form/${id}` : `/users/form/create`);
export const USER_EDIT = (user) => `/users/edit/${user}`;
export const USERS_PAGE = '/users';

// Permisions actions (CRUD)
export const actions = [
  { name: 'create' },
  { name: 'read' },
  { name: 'update' },
  { name: 'delete' }
];
