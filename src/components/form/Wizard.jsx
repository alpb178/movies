import { lottieOptions } from '@/lib/utils';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

const Wizard = ({ initialRoute, initialValues, children, onSubmit, validationSchemas }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [submitButton, setSubmitButton] = useState(false);

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.toArray(children).length - 1;

  useEffect(() => {
    // setPage(0);
    // if (initialRoute) router.push(initialRoute);
  }, []);

  const next = (v) => {
    if (submitButton) {
      setSubmitButton(false);
    }
    setPage(Math.min(page + 1, children.length - 1));

    const assignedValues = Object.keys(v).reduce((_values, key) => {
      const newValues = _values;
      const value = v[key];
      if (value) {
        newValues[key] = value;
      }
      return newValues;
    }, {});

    setValues(v);
  };

  const previous = () => {
    setPage(Math.max(page - 1, 0));
    router.back();
  };

  const handleSubmit = (v, bag) => {
    if (isLastPage) {
      // localStorage.removeItem(PUBLISH_FORM_STATE);
      onSubmit(v, bag);
    } else {
      next(v);
      router.push(activePage.props.nextRoute);
      bag.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchemas[page]}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="relative w-100 h-100">
          {React.cloneElement(activePage, {
            parentState: { ...props },
            onSubmit: handleSubmit,
            setSubmitButton
          })}

          <div className={`flex ${page > 0 ? 'justify-between' : 'justify-end'} w-full`}>
            {page > 0 && (
              <button
                type="button"
                className="p-3 px-4 rounded-full hover:bg-gray-100"
                onClick={previous}
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
            )}

            {!submitButton ? (
              <button
                type="submit"
                className="relative btn-contained"
                disabled={props?.isSubmitting}
              >
                {!isLastPage ? t('continue') : t('save')}
                {props?.isSubmitting ? (
                  <div className="absolute inset-0 z-40 w-full h-full rounded-full bg-primary-100">
                    <Lottie options={lottieOptions('simple')} width={72} />
                  </div>
                ) : null}
              </button>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

Wizard.Page = ({ children, parentState }) => children(parentState);

Wizard.defaultProps = { initialValues: {}, validationSchemas: [] };

Wizard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  initialRoute: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  validationSchemas: PropTypes.array
};

export default Wizard;
