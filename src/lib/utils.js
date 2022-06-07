import { ROLE_ADMIN, ROLE_USER } from '@/lib/constants';
import { differenceInMilliseconds, isBefore, subYears } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import jwtDecode from 'jwt-decode';

export const locales = { es, en: enGB };

export const lang = { es: 'Español', en: 'English' };

export const getHomePageFromUser = (user) => {
  let to;
  switch (user?.roles[0]) {
    case ROLE_USER:
      to = '/dashboard';
      break;
    case ROLE_ADMIN:
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

export const disablePastDates = ({ date }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return differenceInMilliseconds(date, today) < 0;
};

export const disableDatesFrom = ({ date, years }) => {
  const eighteenYearsAgo = subYears(new Date(), years);
  eighteenYearsAgo.setHours(0, 0, 0, 0);
  return differenceInMilliseconds(date, eighteenYearsAgo) > 0;
};

export const formatPrice = (price, decimals = 2) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals
  }).format(Math.ceil(price));

export const valuesFromString = (obj, keysArr) =>
  keysArr.split('.').reduce(function (result, key) {
    return result?.[key];
  }, obj);

export const isTokenExpired = (session) => {
  let isExpired = true;
  if (session?.accessToken) {
    const { exp } = jwtDecode(session.accessToken);
    isExpired = session.expires ? isBefore(new Date(exp * 1000), new Date()) : true;
  }
  return isExpired;
};
