import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';

const UserProfile = ({ data }) => {
  const { t, lang } = useTranslation('common');

  const profile = {
    name: 'Ricardo Cooper',

    coverImageUrl:
      'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    about: `
    <div className="prose max-w-none">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic? Commodi cumque
      similique id tempora molestiae deserunt at suscipit, dolor voluptatem, numquam, harum
      consequatur laboriosam voluptas tempore aut voluptatum alias?
    </p>
    <ul role="list">
      <li>
        Tempor ultrices proin nunc fames nunc ut auctor vitae sed. Eget massa parturient
        vulputate fermentum id facilisis nam pharetra. Aliquet leo tellus.
      </li>
      <li>Turpis ac nunc adipiscing adipiscing metus tincidunt senectus tellus.</li>
      <li>
        Semper interdum porta sit tincidunt. Dui suspendisse scelerisque amet metus eget sed. Ut
        tellus in sed dignissim.
      </li>
    </ul>
  </div>
    `,
    roles: data?.roles,
    fields: {
      phone: data?.phone,
      email: data?.email,
      location: 'San Francisco',
      birthdate: data?.birthdate
        ? format(new Date(data?.birthdate), 'PPP', { locale: { ...locales[lang] } })
        : null
    }
  };

  return (
    <div className="py-8">
      <div className="mx-auto">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          {Object.keys(profile.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="font-medium text-gray-600">{t(field)}</dt>
              <dd className="mt-1 text-gray-900">
                {profile.fields[field] || t('no-data', { field })}
              </dd>
            </div>
          ))}

          <div className="sm:col-span-3">
            <dt className="font-medium text-gray-600">Bio</dt>
            <dd
              className="mt-1 space-y-5 text-gray-900"
              dangerouslySetInnerHTML={{ __html: profile.about }}
            />
          </div>

          <div className="sm:col-span-3">
            <dt className="font-medium text-gray-600">{t('roles', { count: 2 })}</dt>
            {profile?.roles
              ? profile?.roles.map((role) => <dd className="mt-1 text-gray-900">{role}</dd>)
              : t('no-data', { field: 'roles' })}
          </div>
        </dl>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  data: PropTypes.object.isRequired
};

export default UserProfile;
