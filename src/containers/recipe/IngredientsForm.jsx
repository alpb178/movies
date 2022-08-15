import FormikAsyncAutocompleteField from '@/components/form/async-autocomplete/formik';
import useProducts from '@/hooks/product/useProducts';
import { API_PRODUCTS_URL } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Lottie from 'react-lottie';

function IngredientsForm({ errors, touched }) {
  const { t } = useTranslation('common');

  const { data: products, isLoading } = useProducts({
    options: {
      keepPreviousData: true
    }
  });
  return (
    <div>
      <label htmlFor="price">{t('ingredients')}</label>
      <FormikAsyncAutocompleteField
        name="name"
        placeholder={t('form.products.placeholder.name')}
        options={products?.rows ? products.rows : []}
        optionLabels={['name']}
        keysToMatch={['name']}
        className={clsx(
          'autocomplete-field focus-within:bg-white',
          errors?.shipmentItems && touched?.shipmentItems
            ? 'border-red-400 bg-red-100'
            : 'border-transparent bg-gray-100'
        )}
        baseEndpoint={`${API_PRODUCTS_URL}/catalog`}
        // requestParams={regulationsParams}
        loader={<Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />}
        emptyOptionsLabel={t('products', { count: 0 })}
        // icon={<ViewGridIcon className="w-6 h-6 m-4" />}
        // onSelectionChange={handleSelection}
      />
    </div>
  );
}

export default IngredientsForm;
