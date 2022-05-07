import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import MultipleSelectionAutcompleteField from '@/components/form/MultipleSelectionAutocompleteField';
import usePermissions from '@/hooks/permission/usePermissions';
import { saveRoles } from '@/hooks/role/useRoles';
import { API_ROLES_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RolesForm = ({ data, onLoading, onOpen, open }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isNewData, setIsNewData] = useState(true);

  const initialValues = {
    name: data?.name || '',
    permissions: data?.permissions || []
  };

  const { data: permissions } = usePermissions({
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    permissions: Yup.string()
  });

  const onSubmit = async (values) => {
    debugger;
    let method = POST;
    let message = t('inserted.male', { entity: t('roles', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('roles', { count: 1 }) });
    }
    try {
      onLoading(true);
      await saveRoles({
        args: values,
        options: {
          method: method
        }
      });
      queryClient.invalidateQueries([API_ROLES_URL]);
      toast(message);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      onLoading(false);
      onOpen(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="role"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      setErrorsForm={setErrors}
      setTouchedForm={setTouched}
      validationSchema={validationSchema}
      isNewData={isNewData}
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

      <div className="space-y-2">
        <label htmlFor="code">{t('permissions', { count: 2 })}</label>
        <div className="relative w-full mx-auto">
          <MultipleSelectionAutcompleteField
            name="permissions"
            options={permissions?.rows ? permissions.rows : []}
            optionLabels={['action', 'resource.name']}
            keysToMatch={['action', 'resource.name']}
            labelSeparator=" "
            className="autocomplete-field"
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

RolesForm.propTypes = {
  data: PropTypes.object,
  onLoading: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default RolesForm;
