/* eslint-disable react/react-in-jsx-scope */
import EmptyState from '@/components/common/EmptyState';
import useResources from '@/hooks/resource/useResources';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import ListItemActions from './ListItemActions';
import ResourceForm from './ResourceForm';

function ResourcesList() {
  const { t } = useTranslation('common');
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);

  const { data: resources } = useResources();

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

  const renderInsertButton = () => (
    <button type="button" className="btn-contained" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('resources', { count: 1 }).toLowerCase() })}
    </button>
  );

  return (
    <div className="p-5">
      <div className="flow-root mt-12">
        <div>
          {resources && resources?.rows.length > 0 ? (
            resources.rows.map((resource) => (
              <>
                <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                  <h3 className="text-xl font-medium lg:text-2xl text-gray-700">
                    {t('resources', { count: 2 })}
                  </h3>
                  {renderInsertButton()}
                </div>
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  <li key={resource.id} className="py-5 mt-3 cursor-pointer">
                    <div className="relative flex items-center justify-between">
                      <p className="font-semibold text-gray-800">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {t(resource.name, { count: 2 })}
                      </p>
                      <ListItemActions actions={actions} resource={resource} />
                    </div>
                  </li>
                </ul>
              </>
            ))
          ) : (
            <EmptyState className="text-sm" text={t('resources', { count: 0 })}>
              {renderInsertButton()}
            </EmptyState>
          )}
        </div>
      </div>

      <ResourceForm
        data={selectedItem}
        onLoading={setLoading}
        onOpen={setOpenForm}
        open={openForm}
      />
    </div>
  );
}

export default ResourcesList;
