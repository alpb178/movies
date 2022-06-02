import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import usePermissions from '@/hooks/permission/usePermissions';
import useResources from '@/hooks/resource/useResources';
import { saveRole } from '@/hooks/role/useRoles';
import { apiFetcher } from '@/lib/apiFetcher';
import { actions, API_ROLES_URL, POST, PUT } from '@/lib/constants';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RolesForm = ({ roleId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation('common');

  const [role, setRole] = useState();
  const [rolePermissions, setRolePermissions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewData, setIsNewData] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!isNaN(roleId)) {
        const { data } = await apiFetcher(`${API_ROLES_URL}/${roleId}`, {
          params: {},
          keepPreviousData: true
        });
        setRole(data);
      }
    };

    fetchRole();
  }, [roleId]);

  const initialValues = {
    name: role?.name || ''
  };

  const { data: resources, isLoading: isLoadingResources } = useResources({
    options: {
      keepPreviousData: true
    }
  });

  const permissionsParams = useMemo(() => {
    if (resources?.count) {
      // Max size amount of permissions allowed to exist
      return { size: resources.count * 4 };
    }
  }, [resources]);

  const { data: permissions, isLoading: isLoadingPermissions } = usePermissions({
    args: permissionsParams,
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required()
  });

  const onSubmit = async (values) => {
    const { name, ...rest } = values;
    const body = { name };

    body.permissions = Object.keys(rest).map((key) => ({ id: key }));
    let method = POST;
    let message = t('inserted.male', { entity: t('roles', { count: 1 }) });

    if (role) {
      method = PUT;
      body.id = role.id;
      message = t('updated.male', { entity: t('roles', { count: 1 }) });
    }

    try {
      setIsLoading(true);
      await saveRole({
        args: body,
        options: {
          method
        }
      });
      await queryClient.invalidateQueries([API_ROLES_URL]);
      toast(message);
      router.back();
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    role?.id ? setIsNewData(false) : setIsNewData(true);
  }, [role?.id]);

  const columns = useMemo(() => [
    {
      Header: t('resources', { count: 1 }),
      accessor: 'name',
      Cell: ({ value: name }) => t(name, { count: 2 })
    },
    {
      id: 'permissions',
      accessor: 'permissions',
      className: 'w-full flex justify-between',
      displayName: 'permissions',
      Cell: ({ row }) => (
        <div aria-labelledby="checkbox-group" className="grid w-full grid-cols-4">
          {actions.map((action) => {
            const existentPermissions =
              permissions?.rows &&
              permissions.rows.find(
                (item) => item.resource.name === row.original.name && item.action === action.name
              );

            return existentPermissions?.action ? (
              <label
                key={`permissions.${action.name}.${row.original.name}`}
                htmlFor={`permissions.${action.name}.${row.original.name}`}
                className="inline-flex items-center cursor-pointer"
              >
                <Field
                  // id={`permissions.${action.name}.${row.original.name}`}
                  className="w-5 h-5 transition-all duration-150 ease-linear text-secondary-600 form-checkbox"
                  type="checkbox"
                  name={`${existentPermissions.id}`}
                />
                <span className="ml-2 font-medium text-gray-700">{t(action.name)}</span>
              </label>
            ) : (
              <p />
            );
          })}
        </div>
      )
    }
  ]);

  // const FilterCriteria = () =>
  //   Object.keys(filterValues).map(
  //     (e) =>
  //       filterValues[e] !== '' && (
  //         <div className="flex items-center px-4 py-1 mr-4 text-sm font-medium bg-gray-100 rounded-full w-max">
  //           <span key={filterValues[e]} className="font-medium">
  //             {`${t(e)}: `}
  //             <span className="font-normal">{filterValues[e]}</span>
  //           </span>
  //           <button type="button" id={filterValues[e]} onClick={(event) => handleClick(event, e)}>
  //             <XCircleIcon className="w-6 h-6 ml-2 float-center" />
  //           </button>
  //         </div>
  //       )
  //   );

  // const handleFilters = (values) => {
  //   setFilterValues(values);
  // };

  // const handleClick = (event, value) => {
  //   const updatedFilters = Object.keys(filterValues)
  //     .filter((key) => value != key)
  //     .reduce(
  //       (obj, key) => ({
  //         ...obj,
  //         [key]: filterValues[key]
  //       }),
  //       {}
  //     );

  //   setFilterValues(updatedFilters);
  // };

  const options = {
    columns,
    data: resources?.rows,
    count: resources?.count
    // setPage: onPageChangeCallback,
    // setSortBy: onSortChangeCallback,
    // pageSize,
    // onPageSizeChange: setPageSize,
    // onFilter: (
    //   <div className={clsx('w-full px-6', openFilters && 'flex flex-col')}>
    //     <PermissionsFilter open={openFilters} onSubmit={handleFilters} />

    //     <div className="flex">
    //       <FilterCriteria />
    //     </div>
    //   </div>
    // ),
    /*  actions: (
      <div className="space-x-4">
        <button
          type="button"
          className="px-8 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button> 
      </div>
    )*/
  };

  return (
    <>
      {isLoading || isLoadingResources || isLoadingPermissions ? <Loading /> : null}

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, setFieldValue, touched }) => {
          useEffect(() => {
            Object.keys(initialValues).forEach((field) => {
              setFieldValue(field, initialValues[field], false);
            });
          }, [role]);

          return (
            <Form className="p-6 space-y-6 text-lg">
              <div className="flex items-center justify-between mb-8">
                <p className="form-header">
                  {isNaN(roleId) ? t('form.role.title.create') : t('form.role.title.update')}
                </p>
                <div className="flex justify-end space-x-8">
                  <button
                    type="button"
                    className="px-8 py-3 font-medium leading-5 transition duration-300 ease-in-out border border-gray-300 rounded-md hover:bg-red-100 hover:text-red-500 hover:border-red-500"
                    onClick={() => router.back()}
                  >
                    {t('cancel')}
                  </button>
                  <button type="submit" className="btn-contained">
                    {t('save')}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="name">{t('form.common.label.name')}</label>
                <div className="relative w-full max-w-md">
                  <Field
                    id="name"
                    name="name"
                    className={`text-field ${
                      errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.name && touched?.name ? (
                    <p className="mt-4 text-red-600">{errors?.name}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                {/* <label htmlFor="code">{t('permissions', { count: 2 })}</label>
            <div className="relative w-full mx-auto"> */}
                {/* <MultipleSelectionAutcompleteField
                name="permissions"
                options={resources?.rows ? resources.rows : []}
                optionLabels={['action', 'resource.name']}
                keysToMatch={['action', 'resource.name']}
                labelSeparator=" "
                className="autocomplete-field"
              /> */}
                <DataTable {...options} />
                {/* </div> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

RolesForm.propTypes = {
  roleId: PropTypes.number,
  row: PropTypes.object
};

export default RolesForm;
