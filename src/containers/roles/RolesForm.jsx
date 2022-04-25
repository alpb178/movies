import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import MultipleSelectionAutcompleteField from '@/components/form/MultipleSelectionAutocompleteField';
import usePermissions from '@/hooks/permission/usePermissions';
import useRoles from '@/hooks/role/useRoles';
import { POST } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

const RolesForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const initialValues = {
    name: data?.name || '',
    permissions: data?.permissions || ''
  };

  const { data: permissions, isLoading } = usePermissions({
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  });

  const onSubmit = (values) => {
    useRoles({
      args: values,
      options: {
        method: POST
      }
    });
    onOpen(false);
    queryClient.invalidateQueries();
  };

  return (
    <FormDialogWrapper
      formName="role"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
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

      <div className="space-y-2">
        <label htmlFor="code">{t('permissions', { count: 2 })}</label>
        <div className="relative w-full mx-auto">
          <MultipleSelectionAutcompleteField
            id="permissions"
            name="permissions"
            options={permissions?.rows ? permissions.rows : []}
            className="autocomplete-field"
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

RolesForm.propTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired
};

export default RolesForm;
