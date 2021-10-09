import useTranslation from 'next-translate/useTranslation';

export { default as getInitials } from './getInitials';

export const lang = { es: 'Español', ca: 'Catalán', fr: 'Francés', en: 'English' };

// export const currentUser = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

// export const getUsername = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : null;

// export const userId = currentUser ? currentUser.id : null;

export const parseI18nName = (name) => {
  const { t, lang: language } = useTranslation('common');

  return name?.includes('{')
    ? JSON.parse(name)[language] || t('no-name', { lang: lang[language] })
    : name;
};
