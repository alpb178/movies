import EmptyState from '@/components/common/EmptyState';
import useResources from '@/hooks/resource/useResources';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

function ResourcesList() {
  const { t } = useTranslation('common');

  const { data: resources } = useResources();

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
              <li key={resource.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="font-semibold text-gray-800">
                    <a href="#" className="hover:underline focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {t(resource.name, { count: 2 })}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{resource.preview}</p>
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
