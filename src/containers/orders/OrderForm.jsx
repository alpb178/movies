import Loading from '@/components/common/Loader';
import { useAppContext } from '@/components/context/AppContext';
import Status from '@/components/status';
import useOrders, { saveOrders } from '@/hooks/orders/useOrders';
import { formatPrice, locales } from '@/lib/utils';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { AREA_PAGE, POST, PUT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const OrderForm = ({ ordersId }) => {
  const { t, lang } = useTranslation('common');
  const locale = {
    ...locales[lang]
  };

  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();

  const router = useRouter();
  const [tableArea, setTableArea] = useState([]);

  const { data: orders, isLoading: isLoading } = useOrders({
    args: { id: ordersId },
    options: { keepPreviousData: true, enabled: !isNaN(ordersId) }
  });

  const profit = useMemo(() => {
    let total = 0;
    if (orders?.orderProducts?.length > 0) {
      orders?.orderProducts.map((option) => {
        total += option?.amount * option?.recipe?.price;
      });
      return total;
    }
  }, [orders]);

  const service = useMemo(() => {
    if (profit) return profit * orders?.service;

    return 0;
  }, [profit]);

  const discount = useMemo(() => {
    if (profit) return profit * orders?.discount;

    return 0;
  }, [profit]);

  const initialValues = {
    name: orders?.name || '',
    tables: orders?.tables || [],
    service: orders?.service * 100 || 0
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name'))
  });

  const onSubmit = async (values) => {
    let method = POST;

    const body = {
      tables: tableArea,
      name: values.name,
      business: user?.data?.business[0]?.id
    };

    let message = t('inserted.female', { entity: t('orders', { count: 1 }) });
    if (!isNaN(ordersId)) {
      method = PUT;
      body.id = ordersId;
      message = t('updated.female', { entity: t('orders', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveOrders({
        args: body,
        options: {
          method
        }
      });
      setLoading(false);
      toast(message);
      router.push(AREA_PAGE);
    } catch (error) {
      toast.error(error.response.data.message || error.toString(), { theme: 'colored' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
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
                            {t('form.sales.title.edit')}
                          </h2>
                          <p className="max-w-2xl mt-1 text-sm text-gray-500">
                            {t('form.sales.title.editEspecified')}
                          </p>
                        </div>

                        <Status data={orders?.status} className="p-1 px-6 text-base rounded-full" />
                      </div>

                      <div className="flex flex-col justify-between px-4 py-5 space-y-4 border-gray-200 lg:space-x-4 lg:flex-row lg:space-y-0 border-y sm:px-8">
                        <div className="space-y-4 font-medium text-gray-900">
                          <div className="font-medium text-gray-900">
                            {orders?.table?.code.includes(t('tables', { count: 1 }))
                              ? orders?.table?.code
                              : `${t('tables', { count: 1 })} ${orders?.table?.code}`}
                            <span className="font-normal text-gray-600">{` en `}</span>
                            {orders?.table?.area?.name || ''}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {t('form.common.label.createdAt')} - {t('form.common.label.time')}
                            </p>
                            <div className="mt-1 text-sm text-gray-900">
                              {format(new Date(orders?.createdAt), 'PP', { locale })} -{' '}
                              {new Date(orders?.createdAt).toLocaleTimeString('en-US')}
                            </div>
                          </div>

                          <div className="sm:col-span-1">
                            <p className="text-sm font-medium text-gray-500">
                              {t('form.common.label.updatedAt')} - {t('form.common.label.time')}
                            </p>
                            <dd className="mt-1 text-sm text-gray-900">
                              {format(new Date(orders?.updatedAt), 'PP', { locale })} -{' '}
                              {new Date(orders?.updatedAt).toLocaleTimeString('en-US')}
                            </dd>
                          </div>
                        </div>

                        <div className="lg:max-w-xs sm:col-span-1">
                          <p className="text-sm font-medium text-gray-500">
                            {t('form.common.label.amount')}
                          </p>

                          <div className="grid grid-cols-2 gap-2 mt-2 text-base gap-x-8">
                            <p>Subtotal</p>
                            <span className="font-medium text-right text-gray-700">
                              {formatPrice(profit) || 0}
                            </span>
                            <p>
                              Servicio
                              <div className="relative w-full mx-auto font-medium text-gray-400">
                                <NumberFormat
                                  decimalSeparator={','}
                                  decimalScale={2}
                                  id="cost"
                                  name="cost"
                                  // value={cost}
                                  className="text-field dense"
                                  onChange={(e) => onChangeCost(e.target.value)}
                                />
                                <p className="absolute inset-y-0 right-0 flex items-center pr-10">
                                  %
                                </p>
                              </div>
                            </p>
                            <span className="font-medium text-right text-gray-700">
                              {formatPrice(service) || 0}
                            </span>
                            <p>
                              Descuento{' '}
                              <span className="font-medium text-gray-400">
                                <div className="relative w-full mx-auto">
                                  <NumberFormat
                                    decimalSeparator={','}
                                    decimalScale={2}
                                    id="service"
                                    name="service"
                                    // value={cost}
                                    className="text-field dense"
                                    onChange={(e) => onChangeCost(e.target.value)}
                                  />
                                  <p className="absolute inset-y-0 right-0 flex items-center pr-10">
                                    %
                                  </p>
                                </div>
                              </span>
                            </p>
                            <span className="font-medium text-right text-gray-700">
                              {formatPrice(discount) || 0}
                            </span>
                            <p className="font-semibold">Total</p>
                            <span className="font-semibold text-right text-emerald-600">
                              {formatPrice(profit + service - discount) || 0}
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
                      {t('products', { count: 2 })}
                    </h2>
                  </div>

                  <div className="w-full pt-5 mt-0 border-t border-gray-200 lg:mt-5">
                    {orders?.orderProducts?.length > 0 ? (
                      <dl className="w-full px-4 space-y-6 sm:px-8">
                        {orders?.orderProducts.map((option) => (
                          <div key={option?.id} className="flex justify-between w-full space-x-8">
                            <div className="w-full">
                              <p className="font-medium text-gray-700">{option?.recipe?.name}</p>
                              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                                {t('products', { count: 1 })}
                              </p>
                            </div>

                            <div className="w-full">
                              <p className="font-medium text-gray-700">{`${
                                option?.amount
                              } x ${formatPrice(option?.recipe?.price, 2)}`}</p>
                              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                                {t('form.common.label.size')}- {t('form.common.label.price')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-700">
                                <span className="py-1 mt-5 font-medium">
                                  {formatPrice(option?.amount * option?.recipe?.price) || 0}
                                </span>
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('form.common.label.amount')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                </section>
              </div>

              <div className="flex justify-end space-x-8">
                <button type="submit" className="btn-contained">
                  {t('save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

OrderForm.defaultProps = {
  ordersId: null
};

OrderForm.propTypes = {
  ordersId: PropTypes.string
};

export default OrderForm;
