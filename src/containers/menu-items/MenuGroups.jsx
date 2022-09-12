/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { useAppContext } from '@/components/context/AppContext';
import RightSidebar from '@/components/sidebar/RightSidebar';
import { saveProduct } from '@/hooks/product/useProducts';
import { API_PRODUCTS_CATALOG_URL, POST, PUT } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const MenuGroups = ({ data, onOpen, open, products, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const [directSale, setDirectSale] = useState(false);

  const { user } = useAppContext();

  const initialValues = {
    name: data?.name || '',
    measureUnit: data?.measureUnit || ''
  };

  // const { data: recipeGroups } = useRecipeGroups({
  //   args: {},
  //   options: {
  //     keepPreviousData: true
  //   }
  // });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name'))
  });

  const onSubmit = async (values) => {
    const { name } = values;
    const body = { name };
    let method = POST;
    let message = t('inserted.male', { entity: t('recipe-group', { count: 1 }) });
    if (data) {
      method = PUT;
      sendBody.id = data.id;
      message = t('updated.male', { entity: t('recipe-group', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveProduct({
        args: sendBody,
        options: {
          method
        }
      });
      await queryClient.invalidateQueries([API_PRODUCTS_CATALOG_URL]);
      toast(message);
    } catch (error) {
      toast(error.response.data.message || error.toString());
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
    <RightSidebar open={open} onOpen={onOpen}>
      {/* <div className="p-6 space-y-6 text-lg">
        <div className="space-y-2">
          <div className="relative w-full mx-auto">
            <div className="absolute z-10 text-center text-gray-500"></div>
            <Field
              name="name"
              className={clsx(
                'text-field',
                errors?.shipmentItems && touched?.shipmentItems
                  ? 'border-red-400 bg-red-100'
                  : ' filled'
              )}
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="category">{t('measure-units', { count: 1 })}</label>
          <div className="relative w-full mx-auto">
            <AutocompleteField
              id="measureUnit"
              name="measureUnit"
              options={measureUnits?.rows ? measureUnits.rows : []}
              className="text-field filled"
              defaultValue={data?.measureUnit}
              placeholder={t('select')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="cost">{t('form.common.label.cost')}</label>
          <div className="relative w-full mx-auto">
            <Field id="cost" type="number" name="cost" className="text-field filled" />
            {errors?.cost && touched?.cost ? (
              <p className="mt-4 text-red-600">{errors?.cost}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description">{t('form.common.label.description')}</label>
          <Field
            as="textarea"
            className="text-field filled"
            rows={3}
            id="description"
            name="description"
          />
        </div>

        <div className="flex justify-between">
          <label className="flex items-center">{t('direct-sale')}</label>
          <Field id="directSale" name="directSale">
            {({ form: { values, setFieldValue } }) => (
              <CustomSwitch
                checked={values?.directSale}
                onChange={(val) => {
                  // setPushNotification(val);
                  setFieldValue('directSale', val);
                  setDirectSale(!directSale);
                }}
              />
            )}
          </Field>
        </div>

        {directSale ? (
          <div className="space-y-2">
            <label htmlFor="price">{t('form.common.label.price')}</label>
            <div className="relative w-full mx-auto">
              <Field id="price" type="number" name="price" className="text-field filled" />
              {errors?.price && touched?.price ? (
                <p className="mt-4 text-red-600">{errors?.price}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div> */}
    </RightSidebar>
  );
};

MenuGroups.defaultProps = {
  data: null,
  errors: null
};

MenuGroups.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default MenuGroups;
