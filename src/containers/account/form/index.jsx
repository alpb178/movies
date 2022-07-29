import Wizard from '@/components/form/Wizards';
import useTranslation from 'next-translate/useTranslation';
import * as Yup from 'yup';
import BusinessFormPage from './BusinessFormPage';
import UsersFormPage from './UsersFormPage';

const PublishTravelForm = () => {
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
    console.log(values);
  };

  const steps = [
    <BusinessFormPage nextRoute="create-account" />,
    <UsersFormPage nextRoute="users" />
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

export default PublishTravelForm;
