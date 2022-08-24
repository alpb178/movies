import { ROLE_ADMIN, ROLE_USER } from '@/lib/constants';
import reviewsAnimationData from '@/public/lottie/checkboard-reviews.json';
import emailSentAnimationData from '@/public/lottie/email-sent.json';
import notificationsAnimationData from '@/public/lottie/empty-notifications.json';
import loadingAnimationData from '@/public/lottie/loading-spinner.json';
import offlineAnimationData from '@/public/lottie/offline.json';
import spinnerAnimationData from '@/public/lottie/simple-spinner.json';
import travelsAnimationData from '@/public/lottie/travelers-find-location.json';
import { differenceInMilliseconds, isBefore, subYears } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import jwtDecode from 'jwt-decode';

export const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' }
];
export const locales = { es, en: enGB };

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
    currency: 'USD',
    minimumFractionDigits: decimals
  }).format(Math.ceil(price));

export const formatNumber = (num) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);

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

const getAnimationData = (view) => {
  switch (view) {
    case 'reviews':
      return reviewsAnimationData;
    case 'travels':
      return travelsAnimationData;
    case 'notifications':
      return notificationsAnimationData;
    case 'email-sent':
      return emailSentAnimationData;
    case 'simple':
      return spinnerAnimationData;
    case 'offline':
      return offlineAnimationData;
    default:
      return loadingAnimationData;
  }
};

export const lottieOptions = (view) => ({
  loop: true,
  autoplay: true,
  animationData: getAnimationData(view),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
});
