/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import { useAppContext } from '@/components/context/AppContext';
import AutocompleteField from '@/components/form/AutocompleteField';
import CustomSwitch from '@/components/form/CustomSwitch';
import useUsers, { saveUser } from '@/hooks/user/useUsers';
import { Field, Form, Formik } from 'formik';
import { POST, PUT, USERS_PAGE } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const UsersForm = ({ userId }) => {
  const { t } = useTranslation('common');
  const { user } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [status] = useState([{ id: 'PENDING' }, { id: 'ACTIVE' }, { id: 'INACTIVE' }]);

  const { data: users, isLoading: isLoadingUsers } = useUsers({
    args: { id: userId },
    options: { keepPreviousData: true, enabled: userId !== 'create' }
  });

  var regex =
    /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;

  const initialValues = {
    firstName: users?.firstName || '',
    lastName: users?.lastName || '',
    email: users?.email || '',
    mobile: users?.mobile || '',
    birthdate: users?.birthdate || '',
    bio: users?.bio || '',
    status: { id: users?.status } || '',
    password: users?.password || '',
    repeatPassword: '',
    isOwner: users?.isOwner || false
  };

  const validatePassword = () => {
    return true;
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('required.name')),
    lastName: Yup.string().required(t('required.surname')),
    email: Yup.string()
      .required(t('form.common.required.email'))
      .email(t('form.common.required.email-wrong')),
    mobile: Yup.string()
      .required(t('form.common.required.phone'))
      .matches(regex, t('form.common.required.phone-wrong')),
    status: Yup.object().nullable().required(t('required.status')),
    password: Yup.string()
      .ensure()
      .when('create', {
        is: validatePassword,
        then: Yup.string()
          .oneOf([Yup.ref('repeatPassword'), null], t('required.password-compare'))
          .required(t('required.password'))
      }),
    repeatPassword: Yup.string()
      .ensure()
      .when('create', {
        is: validatePassword,
        then: Yup.string()
          .oneOf([Yup.ref('password'), null], t('required.password-compare'))
          .required(t('required.password-confirm'))
      })
  });

  const onSubmit = async (values) => {
    const { email, firstName, lastName, mobile, status, password, isOwner } = values;
    const usersSendApi = { email, firstName, lastName, mobile, status, password, isOwner };
    usersSendApi.status = status.id;
    usersSendApi.business = user?.data?.business[0]?.id;
    let method = POST;
    try {
      setLoading(true);
      let message = t('inserted.male', { entity: t('users', { count: 1 }) });
      if (users) {
        method = PUT;
        usersSendApi.id = userId;
        message = t('updated.male', { entity: t('users', { count: 1 }) });
      }
      await saveUser({
        args: usersSendApi,
        options: {
          method
        }
      });

      toast(message);
      router.push(USERS_PAGE);
    } catch (error) {
      toast.error(error.response.data.message || error.toString()), { theme: 'colored' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoadingUsers ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
              <p className="mb-8 form-header">
                {isNaN(userId) ? t('form.user.title.create') : t('form.user.title.update')}
              </p>
              <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                <div className="space-y-2">
                  <label htmlFor="firstName">{t('form.common.label.name')}</label>
                  <Field
                    name="firstName"
                    id="firstName"
                    placeholder={t('form.user.placeholder.firstName')}
                    type="text"
                    className="text-field filled"
                  />
                  {errors?.firstName && touched?.firstName ? (
                    <p className="mt-4 text-red-600">{errors?.firstName}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="surname">{t('surname')}</label>
                  <Field
                    name="lastName"
                    placeholder={t('form.user.placeholder.lastName')}
                    type="text"
                    className="text-field filled"
                  />
                  {errors?.lastName && touched?.lastName ? (
                    <p className="mt-4 text-red-600">{errors?.lastName}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">{t('email')}</label>
                  <Field
                    name="email"
                    placeholder={t('form.user.placeholder.email')}
                    type="text"
                    className="text-field filled"
                  />
                  {errors?.email && touched?.email ? (
                    <p className="mt-4 text-red-600">{errors?.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="space-y-2 mt-8 ">
                  <label htmlFor="mobile">{t('phone')}</label>
                  <Field
                    name="mobile"
                    placeholder={t('form.user.placeholder.mobile')}
                    type="text"
                    className="text-field filled"
                  />
                  {errors?.mobile && touched?.mobile ? (
                    <p className="mt-4 text-red-600">{errors?.mobile}</p>
                  ) : null}
                </div>

                <div className="space-y-2 mt-8">
                  <label htmlFor="status">{t('status')}</label>
                  <AutocompleteField
                    name="status"
                    placeholder={t('form.user.placeholder.status')}
                    options={status}
                    optionLabels={['id']}
                    keysToMatch={['id']}
                    className="text-field filled"
                    aria-describedby="flight"
                    defaultValue={status.find((item) => item.id === users?.status)}
                  />
                </div>

                <div className="space-y-5 space-x-12 mr-8">
                  <label className="flex items-center">{t('form.common.label.is-owner')}</label>
                  <Field id="isOwner" className="mt-5" name="isOwner">
                    {({ form: { values, setFieldValue } }) => (
                      <CustomSwitch
                        checked={values?.isOwner}
                        onChange={(val) => {
                          setFieldValue('isOwner', val);
                        }}
                      />
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="space-y-2 mt-6">
                  <p className="text-xl">{t('form.common.label.password')}</p>

                  <div className="relative  rounded-md">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className={`text-field text-sm mt-2 ${
                        errors?.password && touched?.password
                          ? 'border-red-400 bg-red-100'
                          : 'border-transparent filled'
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
                  {errors?.password && touched?.password ? (
                    <p className="mt-1 text-red-500">{errors?.password}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <p className="text-xl">{t('form.common.label.repeat-password')}</p>

                  <div className="relative  rounded-md ">
                    <Field
                      type={showRepeatPassword ? 'text' : 'password'}
                      name="repeatPassword"
                      id="repeatPassword"
                      className={`text-field text-sm ${
                        errors?.repeatPassword && touched?.repeatPassword
                          ? 'border-red-400 bg-red-100'
                          : 'border-transparent filled'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showRepeatPassword ? (
                        <IoMdEye className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      ) : (
                        <IoMdEyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors?.repeatPassword && touched?.repeatPassword ? (
                    <p className="mt-1 text-red-500">{errors?.repeatPassword}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-end space-x-8">
                <button
                  type="submit"
                  className="px-8 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
                >
                  {t('save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

UsersForm.defaultProps = {
  userId: null
};

UsersForm.propTypes = {
  userId: PropTypes.string
};

export default UsersForm;
