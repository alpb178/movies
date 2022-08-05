import Loading from '@/components/common/Loader';
import useAreas, { saveAreas } from '@/hooks/area/useAreas';
import { Field, Form, Formik } from 'formik';
import { AREA_PAGE, POST, PUT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import TableForm from './TableForm';

const AreasForm = ({ areasId }) => {
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [tableArea, setTableArea] = useState([]);

  const { data: areas, isLoading: isLoading } = useAreas({
    args: { id: areasId },
    options: { keepPreviousData: true, enabled: !isNaN(areasId) }
  });

  const initialValues = {
    name: areas?.name || '',
    tables: areas?.tables || []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name'))
  });

  const onSubmit = async (values) => {
    let method = POST;

    let sendBody = {};
    sendBody.tables = tableArea;
    sendBody.name = values.name;

    let message = t('inserted.female', { entity: t('areas', { count: 1 }) });
    if (!isNaN(areasId)) {
      method = PUT;
      sendBody.id = areasId;
      message = t('updated.female', { entity: t('areas', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveAreas({
        args: sendBody,
        options: {
          method
        }
      });
      setLoading(false);
      toast(message);
      router.push(AREA_PAGE);
    } catch (error) {
      toast(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
              <p className="mb-8 form-header">
                {isNaN(areasId) ? t('form.area.title.create') : t('form.area.title.update')}
              </p>
              <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                <div className="w-full mt-4">
                  <label htmlFor="name">{t('form.common.label.name')}</label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
                  />
                  {errors?.name && touched?.name ? (
                    <p className="mt-4 text-red-600">{errors?.name}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <TableForm
                    data={areas?.tables}
                    errors={errors}
                    setTable={setTableArea}
                    touched={touched}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-8">
                <button
                  type="submit"
                  className="px-8 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
                >
                  {t('save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

AreasForm.defaultProps = {
  areasId: null
};

AreasForm.propTypes = {
  areasId: PropTypes.string
};

export default AreasForm;
