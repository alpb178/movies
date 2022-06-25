/* eslint-disable react/react-in-jsx-scope */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { saveResource } from '@/hooks/resource/useResources';
import { API_RESOURCES_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ResourceForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const [isNewData, setIsNewData] = useState(true);
  const initialValues = {
    name: data?.name
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name'))
  });

  const onSubmit = async (values) => {
    let method = POST;
    let message = t('inserted.male', { entity: t('resources', { count: 1 }) });
    if (values?.id) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('resources', { count: 1 }) });
    }
    try {
      setLoading(true);
      await saveResource({
        args: values,
        options: {
          method
        }
      });
      setLoading(false);
      await queryClient.invalidateQueries([API_RESOURCES_URL]);
      onOpen(false);
      toast(message);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="resources"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="name"
            name="name"
            className={`text-field ${
              errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors?.name && touched?.name ? (
            <p className="mt-4 text-red-600">{errors?.name}</p>
          ) : null}
        </div>
      </div>
    </FormDialogWrapper>
  );
};

ResourceForm.defaultProps = {
  data: {}
};

ResourceForm.propTypes = {
  data: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ResourceForm;
