import Loading from '@/components/common/Loader';
import Wizard from '@/components/form/Wizard';
import { createAccount } from '@/hooks/auth/useAuth';
import { WELCOME_PAGE } from '@/lib/constants';
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
    const { name, address, city, phone, province, zipCode } = values;
    const business = { name, address, city, phone, province, zipCode };
    business.country = 'CUBA';
    const { firstName, lastName, email, mobile, password } = values;
    const user = { firstName, lastName, email, mobile, password };

    let body = { business, user };

    try {
      setLoading(true);
      await createAccount({
        args: body
      });
      router.push(WELCOME_PAGE);
    } catch (error) {
      toast.error(error.toString(), { variant: 'error' });
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
