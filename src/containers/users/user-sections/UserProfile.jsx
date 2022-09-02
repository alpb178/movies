import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';

const UserProfile = ({ data }) => {
  const { t, lang } = useTranslation('common');

  const profile = {
    name: 'Ricardo Cooper',

    coverImageUrl:
      'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    about: `
   
  </div>
     `,
    fields: {
      'form.common.label.status': data?.status,
      'form.common.label.email': data?.email,
      'form.common.label.phone': data?.mobile,
      'form.common.label.createdAt': data?.createdAt
        ? format(new Date(data?.createdAt), 'PPP', { locale: { ...locales[lang] } })
        : null,
      'form.common.label.updatedAt': data?.updatedAt
        ? format(new Date(data?.updatedAt), 'PPP', { locale: { ...locales[lang] } })
        : null,
      'form.common.label.role': data?.roles[0].name || ''
    }
  };

  return (
    <div className="py-8">
      <div className="mx-auto">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {Object.keys(profile.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="font-medium text-gray-600">{t(field)}</dt>
              <dd className="mt-1 text-gray-900">
                {profile.fields[field] || t('no-data', { field })}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  data: PropTypes.object.isRequired
};

export default UserProfile;
