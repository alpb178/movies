import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UserDetail = ({ user }) => {
  const { t } = useTranslation('common');

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{t('users', { count: 1 })}</h3>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('name')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('name')}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('surname')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('surname')}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('email')}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('phone')}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('username')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('username')}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{t('role')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.get('roles')}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object.isRequired
};

const userReducer = 'user';

const mapStateToProps = (state) => ({
  loading: state.getIn([userReducer, 'loading']),
  user: state.getIn([userReducer, 'user'])
});

UserDetail.layout = Admin;

export default connect(mapStateToProps, null)(UserDetail);
