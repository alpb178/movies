import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';

const UserOrganization = ({ data }) => {
  const { t, lang } = useTranslation('common');

  const profile = {
    fields: {
      'form.common.label.name': data?.name,
      'form.common.label.email': data?.email,
      'form.common.label.phone': data?.mobile,
      'form.common.label.province': data?.province,
      'form.common.label.city': data?.city,
      'form.common.label.zipCode': data?.zipcode,
      'form.common.label.address': data?.address,
      createdAt: data?.createdAt
        ? format(new Date(data?.createdAt), 'PPP', { locale: { ...locales[lang] } })
        : null
    }
  };

  return (
    <div className="mt-5">
      <p className="text-2xl m-5 font-bold text-gray-900">{t('form.common.label.data-business')}</p>
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
  );
};

UserOrganization.propTypes = {
  data: PropTypes.object.isRequired
};

export default UserOrganization;
