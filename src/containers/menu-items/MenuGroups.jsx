import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import ContainerSidebarRight from '@/components/container/ContainerSidebarRight';
import { useAppContext } from '@/components/context/AppContext';
import { saveProduct } from '@/hooks/product/useProducts';
import useCategoryRecipes from '@/hooks/recipe-groups/useRecipesGroups';
import { API_PRODUCTS_CATALOG_URL, POST, PUT } from '@/lib/constants';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ListItemActions from './ListItemActions';

const MenuCategories = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);

  const { user } = useAppContext();

  const { data: recipesGroups, isloading } = useCategoryRecipes({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const onSubmit = async (values) => {
    const { name, price, directSale, cost, description, measureUnit } = values;
    const sendBody = { name, price, directSale, cost, description };
    sendBody.measureUnit = measureUnit.id;
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
    } catch (error) {
      toast(error.response.data.message || error.toString());
    } finally {
      setLoading(false);
      onOpen(false);
    }
  };

  const renderInsertButton = () => (
    <button type="button" className="btn-contained" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('recipe-groups', { count: 1 }).toLowerCase() })}
    </button>
  );

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  useEffect(() => {
    onOpen(true);
  });

  const actions = [
    {
      icon: PencilIcon,
      id: 'update',
      name: t('update')
    },
    {
      icon: TrashIcon,
      id: 'delete',
      name: t('delete')
    }
  ];

  return (
    <ContainerSidebarRight
      formName="recipe-groups"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
    >
      <>
        {isloading && <Loading />}
        <div className="flow-root mt-1">
          <div>
            {recipesGroups?.rows?.length < 0 || (
              <div className="flex flex-col justify-between w-full space-y-1 lg:items-center lg:space-y-0 lg:space-x-12 lg:flex-row">
                {renderInsertButton()}
              </div>
            )}
            <ul role="list" className="mt-12 divide-y divide-gray-200">
              {recipesGroups && recipesGroups?.length > 0 ? (
                recipesGroups.map((recipeGroup) => (
                  <>
                    <li key={recipeGroup.id} className="py-3 text-base cursor-pointer">
                      <div className="relative flex items-center justify-between text-gray-800">
                        <p>{t(recipeGroup.name, { count: 2 })}</p>
                        <ListItemActions
                          actions={actions}
                          resource={recipeGroup}
                          setLoading={setLoading}
                        />
                      </div>
                    </li>
                  </>
                ))
              ) : (
                <EmptyState className="text-sm" text={t('recipe-groups', { count: 0 })} />
              )}
            </ul>
          </div>
        </div>
      </>
    </ContainerSidebarRight>
  );
};

MenuCategories.propTypes = {
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired
};

export default MenuCategories;
