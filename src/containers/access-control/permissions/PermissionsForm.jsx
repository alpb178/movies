import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { savePermission } from '@/hooks/permission/usePermissions';
import useResources from '@/hooks/resource/useResources';
import { actions, API_PERMISSIONS_URL, POST, PUT } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const PermissionsForm = ({ data, onLoading, onOpen, open }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const initialValues = {
    action: data?.action,
    resource: data?.resource
  };

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: resources } = useResources({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    action: Yup.object().shape({ name: Yup.string() }),
    resource: Yup.object().shape({ name: Yup.string() })
  });

  const onSubmit = async (values) => {
    try {
      onLoading(true);
      values.action = values.action.name;
      values.resource = values.resource.id;
      let method = POST;

      if (data) {
        method = PUT;
        values.id = data.id;
      }

      await savePermission({
        args: values,
        options: { method }
      });

      onLoading(false);
      queryClient.refetchQueries([API_PERMISSIONS_URL]);
      // toast(message);
      onOpen(false);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <FormDialogWrapper
      formName="permissions"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      setErrorsForm={setErrors}
      setTouchedForm={setTouched}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="action">{t('form.permissions.action.label')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            name="action"
            options={Object.values(actions).map((action) => action)}
            className="autocomplete-field"
            defaultValue={data?.action}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">{t('form.permission.resource.label')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            name="resource"
            options={resources ? resources.rows : []}
            className="autocomplete-field"
            defaultValue={data?.resource}
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

PermissionsForm.propTypes = {
  data: PropTypes.object,
  onLoading: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default PermissionsForm;
