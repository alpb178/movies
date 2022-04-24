import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { USERS_PAGE } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { getRoles, updateUser } from 'redux/actions';
import { Formik, Field, Form } from 'formik';
import router from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersEdit = ({ user, data, onGetRoles, onUpdateUser }) => {
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required.username')),
    name: Yup.string().required(t('required.name')),
    surname: Yup.string().required(t('required.surname')),
    email: Yup.string().required(t('required.email')),
    phone: Yup.string().required(t('required.phone'))
  });

  const initialValues = {
    username: user.get('username'),
    name: user.get('name'),
    surname: user.get('surname'),
    phone: user.get('phone'),
    email: user.get('email'),
    roles: user.get('roles').toJS()[0],
    client_number: user.get('client_number')
  };

  useEffect(() => {
    onGetRoles();
  }, []);

  const onSubmit = (values) => {
    try {
      setLoading(true);
      values.roles = [values.roles];
      onUpdateUser(values);
    } catch (error) {
      // let _messageErrors = [trans.unknownUserErrorMsg];
    } finally {
      setLoading(false);
      router.push(USERS_PAGE);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('update')} {t('users', { count: 1 })}
              </h3>
            </div>
            <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('name')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block  border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.name && touched.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="name"
                      id="name"
                      aria-describedby="name"
                    />
                  </dd>
                  {errors.name && touched.name ? (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('surname')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.surname && touched.surname ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="surname"
                      id="surname"
                      aria-describedby="surname"
                    />
                  </dd>
                  {errors.surname && touched.surname ? (
                    <p className="mt-2 text-sm text-red-600">{errors.surname}</p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.email && touched.email ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="email"
                      id="email"
                      aria-describedby="email"
                    />
                  </dd>
                  {errors.email && touched.email ? (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.phone && touched.phone ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="phone"
                      id="phone"
                      aria-describedby="phone"
                    />
                  </dd>
                  {errors.phone && touched.phone ? (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('username')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block  border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.username && touched.username ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="username"
                      id="username"
                      aria-describedby="username"
                    />
                  </dd>
                  {errors.username && touched.username ? (
                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                  ) : null}
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('role')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      as="select"
                      className="block border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="roles"
                    >
                      <option key={initialValues.roles} value={initialValues.roles}>
                        {initialValues.roles}
                      </option>
                      {data?.toJS().map((rol) => (
                        <option key={rol.name} value={rol.name}>
                          {rol.name}
                        </option>
                      ))}
                    </Field>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{t('client-number')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Field
                      type="text"
                      className={`block  border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                        errors.username && touched.username ? 'border-red-400' : 'border-gray-300'
                      }`}
                      name="client_number"
                      id="client_number"
                      aria-describedby="client_number"
                    />
                  </dd>
                  {errors.client_number && touched.client_number ? (
                    <p className="mt-2 text-sm text-red-600">{errors.client_number}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="float-center px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300"
                  >
                    {loading ? '...' : t('update')}
                  </button>
                </div>
              </dl>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const rolReducer = 'rol';
const userReducer = 'user';

UsersEdit.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  onGetRoles: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.getIn([rolReducer, 'loading']),
  user: state.getIn([userReducer, 'user']),
  data: state.getIn([rolReducer, 'data']),
  filters: state.getIn([rolReducer, 'filters']),
  total: state.getIn([rolReducer, 'total'])
});

const mapDispatchToProps = (dispatch) => ({
  onGetRoles: () => dispatch(getRoles()),
  onUpdateUser: (user) => dispatch(updateUser(user))
});

UsersEdit.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(UsersEdit);
