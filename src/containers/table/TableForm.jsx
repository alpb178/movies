/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useAreas from '@/hooks/area/useAreas';
import { saveTables } from '@/hooks/table/useTable';
import { API_TABLES_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const TableForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});

  const { data: areas } = useAreas({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const initialValues = {
    code: data?.code || '',
    area: data?.areaId || ''
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(t('form.common.required.code')),
    area: Yup.object().nullable().required(t('form.required.area'))
  });

  const onSubmit = async (values) => {
    const body = {};
    body.areaId = values.area.id;
    body.code = values.code;
    let method = POST;
    let message = t('inserted.female', { entity: t('tables', { count: 1 }) });
    if (data) {
      method = PUT;
      body.id = data.id;
      message = t('updated.female', { entity: t('tables', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveTables({
        args: body,
        options: {
          method
        }
      });
      await queryClient.refetchQueries([API_TABLES_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      onOpen(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormDialogWrapper
      formName="table"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
    >
      <div className="space-y-2">
        <label htmlFor="code">{t('form.common.label.code')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="code"
            name="code"
            className={`text-field ${
              errors?.code && touched?.code ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors?.code && touched?.code ? (
            <p className="mt-4 text-red-600">{errors?.code}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="area">{t('form.common.label.area')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            id="area"
            name="area"
            options={areas ? areas.rows : []}
            className="autocomplete-field"
            defaultValue={data?.areaId}
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

TableForm.defaultProps = {
  data: null,
  errors: null
};

TableForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default TableForm;
