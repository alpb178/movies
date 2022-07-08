/* eslint-disable react/react-in-jsx-scope */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { savePermission } from '@/hooks/permission/usePermissions';
import useResources from '@/hooks/resource/useResources';
import { actions, API_PERMISSIONS_URL, POST, PUT } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const PermissionsForm = ({ data, onLoading, onOpen, open }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const initialValues = {
    action: { id: data?.id, name: data?.action } || '',
    resource: data?.resource || ''
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
    values.action = values.action.name;
    values.resource = values.resource.id;
    let method = POST;
    let message = t('inserted.male', { entity: t('permissions', { count: 1 }) });

    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('permissions', { count: 1 }) });
    }
    try {
      onLoading(true);
      await savePermission({
        args: values,
        options: { method }
      });
      await queryClient.refetchQueries([API_PERMISSIONS_URL]);
      onOpen(false);
      toast(message);
      onLoading(false);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="permissions"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      setErrorsForm={setErrors}
      setTouchedForm={setTouched}
      isNewData={isNewData}
      validationSchema={validationSchema}
    >
      {console.log(initialValues, data)}
      <div className="space-y-2">
        <label htmlFor="action">{t('form.permissions.label.action')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            name="action"
            options={Object.values(actions).map((action) => action)}
            className="autocomplete-field"
            defaultValue={initialValues.action}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">{t('form.permissions.label.resource')}</label>
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
