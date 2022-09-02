/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useRecipes from '@/hooks/recipe/useRecipes';
import { formatPrice, locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const RecipeDetails = ({ recipeId }) => {
  const { t, lang } = useTranslation('common');
  const locale = {
    ...locales[lang]
  };

  const { data: recipe, isLoading } = useRecipes({
    args: { id: recipeId },
    options: {
      keepPreviousData: true,
      enabled: !!recipeId
    }
  });

  const profit = useMemo(() => {
    let total = 0;
    if (recipe?.recipeProducts?.length > 0) {
      recipe?.recipeProducts.map((option) => {
        total += option?.amount * option?.product?.cost;
      });
      return total;
    }
  }, [recipe]);

  const service = useMemo(() => {
    if (profit) return profit * recipe?.service;

    return 0;
  }, [profit]);

  const discount = useMemo(() => {
    if (profit) return profit * recipe?.discount;

    return 0;
  }, [profit]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full pb-8 space-x-0 lg:space-x-8 lg:flex-row">
      <div className="w-full space-y-6">
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white">
            <div className="flex items-start justify-between px-4 py-5 sm:px-8">
              <div className="">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {t('form.recipes.title.details')}
                </h2>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  {t('form.recipes.title.detailsEspecified')}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between px-4 py-5 space-y-4 brecipe-gray-200 lg:space-x-4 lg:flex-row lg:space-y-0 border-y sm:px-8">
              <div className="space-y-4 font-medium text-gray-900">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('form.common.label.name')}</p>
                  <div className="mt-1 text-sm text-gray-900">{recipe?.name}</div>
                </div>

                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('recipe-groups', { count: 1 })}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">{recipe?.recipeGroup?.name || '-'}</dd>
                </div>

                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.createdAt')}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(recipe?.createdAt), 'PP', { locale })}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.updatedAt')}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(recipe?.updatedAt), 'PP', { locale })}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.description')}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">{recipe?.description}</dd>
                </div>
              </div>

              <div className="lg:max-w-xs sm:col-span-1">
                <p className="text-sm font-medium text-gray-500">{t('form.common.label.amount')}</p>

                <div className="grid grid-cols-2 gap-2 mt-2 text-base gap-x-8">
                  <p>{t('form.common.label.sales-price')}</p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(recipe?.price || 0)}
                  </span>
                  <p>{t('form.common.label.cost')}</p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(recipe?.cost || 0)}
                  </span>
                  <p>{t('form.common.label.sales-profit')}</p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(recipe?.salesProfit || 0)}
                  </span>
                  <p>{t('form.common.label.misc-cost')}</p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(recipe.miscCost || 0)}
                  </span>
                  <p className="font-semibold">{t('form.common.label.total-cost')}</p>
                  <span className="font-semibold text-right text-emerald-600">
                    {formatPrice(recipe.miscCost + recipe.price || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full lg:max-w-2xl">
        <div className="px-4 py-5 sm:px-8">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900 bor">
            {t('form.common.label.ingredients')}
          </h2>
        </div>

        <div className="w-full pt-5 mt-0 brecipe-t border-gray-200 lg:mt-5">
          {recipe?.ingredients?.length > 0 ? (
            <dl className="w-full px-4 space-y-6 sm:px-8">
              {recipe?.ingredients.map((option) => (
                <div key={option?.id} className="flex justify-between w-full space-x-8">
                  <div className="w-full">
                    <p className="font-medium text-gray-700">{option?.product?.name}</p>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      {t('products', { count: 1 })}
                    </p>
                  </div>

                  <div className="w-full">
                    <p className="font-medium text-gray-700">{`${option?.amount} x ${formatPrice(
                      option?.product?.cost,
                      2
                    )}`}</p>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      {t('form.common.label.size')}- {t('form.common.label.price')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      <span className="py-1 mt-5 font-medium">
                        {formatPrice(option?.amount * option?.product?.cost) || 0}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{t('form.common.label.amount')}</p>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipeId: PropTypes.number
};

export default RecipeDetails;
