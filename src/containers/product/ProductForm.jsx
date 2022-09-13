/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { useAppContext } from '@/components/context/AppContext';
import AutocompleteField from '@/components/form/AutocompleteField';
import CustomSwitch from '@/components/form/CustomSwitch';
import FormSidebarRight from '@/components/form/FormSidebarRight';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import { saveProduct } from '@/hooks/product/useProducts';
import useCategoryRecipes, { saveCategoryRecipes } from '@/hooks/recipe-groups/useRecipesGroups';
import { API_CATEGORY_RECIPES_URL, API_PRODUCTS_CATALOG_URL, POST, PUT } from '@/lib/constants';
import clsx from 'clsx';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

const RegionForm = ({ data, onOpen, open, products, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const [menuItem, setMenuItem] = useState(false);

  const { user } = useAppContext();

  const initialValues = {
    name: data?.name || '',
    price: data?.menuItem?.price || 0,
    description: data?.description || '',
    isMenuItem: data?.menuItem?.isAvailable || false,
    cost: data?.cost || '',
    measureUnit: data?.measureUnit || '',
    recipeGroup: data?.recipeGroups || ''
  };

  const { data: recipeGroups } = useCategoryRecipes({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const { data: measureUnits } = useMeasureUnits({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    cost: Yup.string().required(t('form.common.required.cost'))
  });

  const onSubmit = async (values) => {
    const { name, price, isMenuItem, cost, description, measureUnit, recipeGroup } = values;
    const sendBody = { name, price, isMenuItem, cost, description, isMenuItem };
    sendBody.measureUnit = measureUnit.id;
    recipeGroup;
    let method = POST;
    let message = t('inserted.male', { entity: t('products', { count: 1 }) });
    if (data) {
      method = PUT;
      sendBody.id = data.id;
      message = t('updated.male', { entity: t('products', { count: 1 }) });
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
      onOpen(false);
    } catch (error) {
      toast.error(error.response.data.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const onCreateRecipeGroups = async (name) => {
    const sendBody = { name: name };
    let method = POST;
    let message = t('inserted.male', { entity: t('recipe-groups', { count: 1 }) });
    try {
      setLoading(true);
      await saveCategoryRecipes({
        args: sendBody,
        options: {
          method
        }
      });
      await queryClient.refetchQueries([API_CATEGORY_RECIPES_URL]);
      setLoading(false);
      toast(message);
    } catch (error) {
      toast(error?.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
    setMenuItem(data?.menuItem?.isAvailable || false);
  }, [data?.id]);

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormSidebarRight
      formName="products"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
    >
      <div className="space-y-6 text-base">
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
          <Field id="isMenuItem" name="isMenuItem">
            {({ form: { values, setFieldValue } }) => (
              <CustomSwitch
                checked={values?.isMenuItem}
                onChange={(val) => {
                  setFieldValue('isMenuItem', val);
                  setMenuItem(!menuItem);
                }}
              />
            )}
          </Field>
        </div>

        {menuItem ? (
          <>
            <div className="space-y-2">
              <label htmlFor="price">{t('form.common.label.price')}</label>
              <div className="relative w-full mx-auto">
                <Field id="price" type="number" name="price" className="text-field filled" />
                {errors?.price && touched?.price ? (
                  <p className="mt-4 text-red-600">{errors?.price}</p>
                ) : null}
              </div>
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="recipeGroups">{t('recipe-groups', { count: 1 })}</label>
              <div className="relative w-full mx-auto">
                <AutocompleteField
                  id="recipeGroup"
                  name="recipeGroup"
                  options={recipeGroups ? recipeGroups : []}
                  className="text-field filled"
                  defaultValue={recipeGroups?.category}
                  actionCreate={onCreateRecipeGroups}
                  actionText={t('recipe-groups.create')}
                  placeholder={t('select')}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </FormSidebarRight>
  );
};

RegionForm.defaultProps = {
  data: null,
  errors: null
};

RegionForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default RegionForm;
