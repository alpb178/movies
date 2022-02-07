export const APP_NAME = 'Backpackpool';

export const TOKEN_KEY = 'token';
export const API_REFRESH_TOKEN_URL = '/token'; // Refresh token action
export const API_LOGIN_URL = '/users/login'; // Login endpoint
export const API_USERS_URL = '/users'; // User endpoint
export const API_ROLES_URL = '/roles';
export const API_AIRLINES_URL = '/airlines';
export const API_COUNTRIES_URL = '/countries';
export const API_FLIGHTS_URL = '/flights';
export const API_MEASURE_UNITS_URL = '/measure-units';
export const API_PAYMENTS_URL = '/payments';
export const API_REGIONS_URL = '/regions';
export const API_REGULATIONS_URL = '/regulations';
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
export const REGIONS_PAGE = '/locations/regions';
export const REGULATIONS_PAGE = '/regulations';
export const REVENUES_PAGE = '/revenues';
export const SETTINGS_PAGE = '/settings';
export const SHIPMENT_ITEMS_PAGE = '/shipment-items';
export const SHIPMENTS_PAGE = '/shipments';
export const TRAVELS_PAGE = '/travels';
export const TRAVEL_DETAILS_PAGE = (value) => `${TRAVELS_PAGE}/detail/${value}`;
export const TRAVEL_FORM_PAGE = (value) => `${TRAVELS_PAGE}/${value}`;

// HTTP Methods
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

//Register
export const REGISTER_PAGE = '/register';

// Roles
export const ADMIN_ROLE = 'ROLE_ADMIN';
export const BASIC_CLIENT_ROLE = 'ROLE_USER';

// Users
export const GET_USER_KEY = 'getUsers';
export const REGISTER_USER_KEY = 'registerUser';
export const USER_DETAIL_PAGE = (user) => `/users/${user}`;
export const USER_ADD = '/users/add';
export const USER_EDIT = (user) => `/users/edit/${user}`;
export const USERS_PAGE = '/users';
