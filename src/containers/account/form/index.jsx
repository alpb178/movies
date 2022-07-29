import Wizard from '@/components/form/Wizards';
import { createAccount } from '@/hooks/auth/useAuth';
import { POST } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import * as Yup from 'yup';
import BusinessFormPage from './BusinessFormPage';
import UsersFormPage from './UsersFormPage';

const CreateAccountForm = () => {
  const { t } = useTranslation('common');

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
    password: ''
  };

  const busisnessValidationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    address: Yup.string().required(t('form.common.required.address')),
    phone: Yup.string().required(t('form.common.required.phone')),
    province: Yup.string().required(t('form.common.required.province')),
    city: Yup.string().required(t('form.common.required.city')),
    zipCode: Yup.string().required(t('form.common.required.zipCode'))
  });

  const usersValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('form.common.required.name')),
    lastName: Yup.string().required(t('form.common.required.lastName')),
    email: Yup.string().required(t('form.common.required.email')),
    mobile: Yup.string().required(t('form.common.required.phone')),
    password: Yup.string().required(t('form.common.required.password'))
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
    business.zipCode = values.zipCode;

    user.email = values.email;
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.mobile = values.mobile;
    user.password = values.password;

    sendBody.business = business;
    sendBody.user = user;
    createAccount({
      args: sendBody,
      options: {
        method
      }
    });
  };

  const steps = [
    <BusinessFormPage key="create-account" nextRoute="create-account" />,
    <UsersFormPage key="users" nextRoute="users" />
  ];

  return (
    <div className="w-full h-full ">
      <Wizard
        initialRoute="create-account"
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
