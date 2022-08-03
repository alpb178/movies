import Loading from '@/components/common/Loader';
import Wizard from '@/components/form/Wizards';
import { createAccount } from '@/hooks/auth/useAuth';
import { LOGIN_PAGE, POST } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BusinessFormPage from './BusinessFormPage';
import UsersFormPage from './UsersFormPage';

const CreateAccountForm = () => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  var regex =
    /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;

  const validatePassword = () => {
    return true;
  };

  const initialValues = {
    name: '',
    address: '',
    phone: '',
    province: '',
    city: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    repeatPassword: ''
  };

  const busisnessValidationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    address: Yup.string().required(t('form.common.required.address')),
    phone: Yup.string()
      .required(t('form.common.required.phone'))
      .matches(regex, t('form.common.required.phone-wrong')),
    province: Yup.string().required(t('form.common.required.province')),
    city: Yup.string().required(t('form.common.required.city')),
    zipCode: Yup.string().required(t('form.common.required.zipCode'))
  });

  const usersValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('form.common.required.name')),
    lastName: Yup.string().required(t('form.common.required.lastName')),
    email: Yup.string()
      .required(t('form.common.required.email'))
      .email(t('form.common.required.email-wrong')),
    mobile: Yup.string()
      .required(t('form.common.required.phone'))
      .matches(regex, t('form.common.required.phone-wrong')),
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

  const validationSchemas = [busisnessValidationSchema, usersValidationSchema];

  const onSubmit = async (values) => {
    let method = POST;
    let sendBody = {};
    let business = {};
    let user = {};

    business.name = values.name;
    business.address = values.address;
    business.city = values.city;
    business.phone = values.phone;
    business.province = values.province;
    business.country = 'CUBA';
    business.zipCode = values.zipCode;

    user.email = values.email;
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.mobile = values.mobile;
    user.password = values.password;

    sendBody.business = business;
    sendBody.user = user;

    try {
      setLoading(true);
      const res = await createAccount({
        args: sendBody,
        options: {
          method
        }
      });
      if (res.ok) router.push(LOGIN_PAGE);
    } catch (error) {
      toast('ERROR');

      setLoading(false);
      let _messageErrors = error;
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 400:
            _messageErrors = t('error.400');
            break;
          case 401:
            _messageErrors = t('error.401');
            break;
          case 500:
            _messageErrors = t('error.500');
            break;
          default:
            _messageErrors = error.toString();
            break;
        }
        toast(_messageErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <BusinessFormPage key="business" nextRoute="user" />,
    <UsersFormPage key="user" />
  ];

  return (
    <div className="w-full h-full px-8 pb-4 sm:px-4">
      {loading && <Loading />}
      <Wizard
        initialRoute="business"
        initialValues={initialValues}
        validationSchemas={validationSchemas}
        onSubmit={onSubmit}
      >
        {steps}
      </Wizard>
    </div>
  );
};

export default CreateAccountForm;
