export const APP_NAME = 'Vebrics';

export const DEFAULT_PAGE_SIZE = 10;
export const NAVBAR_HEIGHT = 92;
export const FOOTER_HEIGHT = 80;

export const TOKEN_KEY = 'next-auth.session-token';
export const API_REFRESH_TOKEN_URL = '/token';
export const API_USERS_URL = '/users';
export const API_PERMISSIONS_URL = '/permissions';
export const API_RESOURCES_URL = '/resources';
export const API_ROLES_URL = '/roles';
export const API_STATISTICS_URL_SALES = '/reports/sales';

// Api Urls Vebrics
export const API_AREA_URL = '/areas';
export const API_BUSINESS_URL = '/business';
export const API_PRODUCT_URL = '/products';
export const API_SALES_URL = '/orders';
export const API_TABLES_URL = '/tables';

// App Routes
export const LOGIN_PAGE = '/auth/login';
export const FORGOT_PASSWORD_PAGE = '/auth/forgot-password';
export const HOME_PAGE = '/dashboard';
export const DASHBOARD_PAGE = '/dashboard';
export const PRODUCT_PAGE = '/product';
export const PERMISSIONS_PAGE = '/permissions';
export const ROLES_PAGE = '/roles';
export const SETTINGS_PAGE = '/settings';

// App Routes Vebrics
export const AREA_PAGE = '/area';
export const BUSINESS_PAGE = '/auth/business';
export const SALES_PAGE = '/sales';
export const TABLE_PAGE = '/table';

// Auth
export const API_AUTH_URL = '/auth';
export const API_CREATE_ACCOUNT_SIGNUP_URL = `${API_AUTH_URL}/signup`;
export const API_CONFIRM_SIGNUP_URL = `${API_AUTH_URL}/confirm/email`;
export const API_CHANGE_PASSWORD_URL = `${API_AUTH_URL}/confirm/password`;
export const API_RESET_PASSWORD_URL = `${API_AUTH_URL}/reset/password`;
export const API_RESET_PASSWORD_UNSECURE_URL = `${API_AUTH_URL}/confirm/password/unsecure`;
export const API_LOGIN_URL = `${API_AUTH_URL}/login`;
export const API_SIGNUP_URL = `${API_AUTH_URL}/signup`;

// HTTP Methods
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// Roles
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

// Area
export const AREAS_DETAIL_PAGE = (id) => `/area/${id}`;
export const AREAS_FORM_PAGE = (id) => (id ? `/area/form/${id}` : `/area/form/create`);
export const AREASS_EDIT = (area) => `/area/edit/${area}`;

// Users
export const GET_USER_KEY = 'getUsers';
export const USER_DETAIL_PAGE = (id) => `/users/${id}`;
export const USER_PROFILE_PAGE = (id) => `/users/profile/${id}`;
export const USER_FORM_PAGE = (id) => (id ? `/users/form/${id}` : `/users/form/create`);
export const USER_EDIT = (user) => `/users/edit/${user}`;
export const USERS_PAGE = '/users';

// Business
export const BUSINESS_DETAIL_PAGE = (id) => `/business/${id}`;
export const BUSINESS_FORM_PAGE = (id) => (id ? `/business/form/${id}` : `/business/form/create`);
export const BUSINESS_EDIT = (business) => `/business/edit/${business}`;

// Sale
export const SALES_DETAIL_PAGE = (id) => `/sales/${id}`;

// Permisions actions (CRUD)
export const actions = [
  { name: 'create' },
  { name: 'read' },
  { name: 'update' },
  { name: 'delete' }
];
