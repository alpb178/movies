/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { savePasswordUnsecure } from '@/hooks/auth/useAuth';
import { LOGIN_PAGE, POST } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ResetPasswordForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    password: '',
    repeatPassword: ''
  };

  const validatePassword = () => {
    return true;
  };

  const validationSchema = Yup.object().shape({
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
    let sendBody = {};
    sendBody.id = data;
    sendBody.password = values.password;
    let method = POST;
    let message = t('updated.female', { entity: t('form.common.label.password') });

    try {
      setLoading(true);
      await savePasswordUnsecure({
        args: sendBody,
        options: {
          method
        }
      });
      toast(message);
      router.push(LOGIN_PAGE);
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormDialogWrapper
      formName="password"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
    >
      <div className="space-y-2">
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
            type={showPassword ? 'text' : 'password'}
            name="repeatPassword"
            id="repeatPassword"
            className={`text-field text-sm mt-2 ${
              errors?.repeatPassword && touched?.repeatPassword
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
        {errors?.repeatPassword && touched?.repeatPassword ? (
          <p className="mt-1 text-red-500">{errors?.repeatPassword}</p>
        ) : null}
      </div>
    </FormDialogWrapper>
  );
};

ResetPasswordForm.defaultProps = {
  data: null,
  errors: null
};

ResetPasswordForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default ResetPasswordForm;
