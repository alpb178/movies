import { ADMIN_ROLE, BASIC_CLIENT_ROLE } from 'lib/constants';

export const getHomePageFromUser = (user) => {
  let to;
  switch (user?.auth.split(',')[0]) {
    case BASIC_CLIENT_ROLE:
      to = '/dashboard';
      break;
    case ADMIN_ROLE:
      to = '/users';
      break;
    default:
      to = '/';
      break;
  }
  return to;
};

export const parseUsername = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');
