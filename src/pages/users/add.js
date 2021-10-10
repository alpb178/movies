import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { ADMIN_ROLE, USERS_PAGE } from 'lib/constants';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';
import { getRoles, createUser } from 'redux/actions';
import { Formik, Field, Form } from 'formik';
import router from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersAdd = ({ data, onGetRoles, onCreateUser }) => {
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required.username')),
    name: Yup.string().required(t('required.name')),
    surname: Yup.string().required(t('required.surname')),
    password: Yup.string().required(t('required.password')),
    email: Yup.string().required(t('required.email')),
    phone: Yup.string().required(t('required.phone'))
  });

  const initialValues = {
    username: '',
    name: '',
    password: '',
    surname: '',
    phone: '',
    email: '',
    roles: []
  };

  useEffect(() => {
    onGetRoles();
  }, []);

  const onSubmit = (values) => {
    try {
      setLoading(true);
      delete values['repeat-password'];
      values.roles = [values['roles']];
      onCreateUser(values);
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
          <div className="overflow-hidden bg-white">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('users', { count: 1 })}
              </h3>
            </div>
            <div className="px-4 py-5 sm:px-6">
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
                      {/* {data?.toJS().map((rol) => (
                        <option key={rol.name} value={rol.name}>
                          {rol.name}
                        </option>
                      ))} */}
                    </Field>
                  </dd>
                </div>

                <div className="flex flex-col space-y-6 sm:space-y-0 sm:space-x-4 sm:flex-row">
                  <div className="flex flex-col w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      {t('password')}
                    </label>
                    <div className="relative mt-1 rounded-md">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className={`block w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                          errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <IoMdEye className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        ) : (
                          <IoMdEyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password ? (
                      <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md float-center bg-primary-500 hover:bg-primary-300"
                  >
                    {loading ? '...' : t('add')}
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

UsersAdd.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
  onGetRoles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.getIn([rolReducer, 'loading']),
  data: state.getIn([rolReducer, 'data']),
  filters: state.getIn([rolReducer, 'filters']),
  total: state.getIn([rolReducer, 'total'])
});

const mapDispatchToProps = (dispatch) => ({
  onGetRoles: () => dispatch(getRoles()),
  onCreateUser: (user) => dispatch(createUser(user))
});

UsersAdd.layout = Admin;
UsersAdd.roles = [ADMIN_ROLE];

export default connect(mapStateToProps, mapDispatchToProps)(UsersAdd);
