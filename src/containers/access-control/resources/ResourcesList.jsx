import EmptyState from '@/components/common/EmptyState';
import useResources from '@/hooks/resource/useResources';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import ListItemActions from './ListItemActions';

function ResourcesList() {
  const { t } = useTranslation('common');

  const { data: resources } = useResources();

  const actions = [
    {
      icon: PencilIcon,
      name: t('update')
    },
    {
      icon: TrashIcon,
      name: t('delete')
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-medium lg:text-3xl">{t('resources', { count: 2 })}</h3>
        <div className="">
          <button type="button" className="btn-outlined">
            {t('create', { entity: t('resources', { count: 1 }).toLowerCase() })}
          </button>
        </div>
      </div>

      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {resources && resources?.rows.length > 0 ? (
            resources.rows.map((resource) => (
              <li key={resource.id} className="py-5 cursor-pointer">
                <div className="relative flex items-center justify-between">
                  <p className="font-semibold text-gray-800">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {t(resource.name, { count: 2 })}
                  </p>
                  <ListItemActions actions={actions} />
                </div>
              </li>
            ))
          ) : (
            <EmptyState />
          )}
        </ul>
      </div>
    </div>
  );
}

export default ResourcesList;
