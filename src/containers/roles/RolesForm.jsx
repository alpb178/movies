import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import MultipleSelectionAutcompleteField from '@/components/form/MultipleSelectionAutocompleteField';
import usePermissions from '@/hooks/permission/usePermissions';
import useRoles from '@/hooks/role/useRoles';
import { API_ROLES_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RolesForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);

  const initialValues = {
    name: data?.name || '',
    permissions: data?.permissions || ''
  };

  const { data: permissions } = usePermissions({
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  });

  const onSubmit = (values) => {
    let method = POST;
    let message = t('inserted.male', { entity: t('roles', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('roles', { count: 1 }) });
    }
    try {
      // setLoading(true);
      useRoles({
        args: values,
        options: {
          method: method
        }
      });
      onOpen(false);
      queryClient.invalidateQueries([API_ROLES_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      //setLoading(false);
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
      validationSchema={validationSchema}
      isNewData={isNewData}
    >
      {console.log(data?.permissions)}
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
            defaultValue={data?.permissions}
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
