import AutocompleteField from '@/components/form/AutocompleteField';
import usePermissions from '@/hooks/permission/usePermissions';
import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const RolesFilter = ({ data, onGetRoles, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const { data: permissions } = usePermissions({});

  const initialValues = {
    permissions: ''
  };

  return (
    <Menu as="div">
      {() => (
        <>
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform -translate-y-5 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-5 opacity-0"
          >
            <Menu.Items className="">
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="flex items-end w-full space-x-4">
                  <div className="w-full">
                    <label htmlFor="rol" className="block font-medium text-gray-700">
                      {t('permissions', { count: 2 })}
                    </label>
                    <AutocompleteField
                      name="permissions"
                      options={permissions ? permissions?.rows : {}}
                      className="autocomplete-field"
                    />
                  </div>

                  <button type="submit" className="h-12 font-medium btn-contained">
                    {t('filter')}
                  </button>
                </Form>
              </Formik>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default RolesFilter;
