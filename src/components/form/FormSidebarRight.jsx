import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import RightSidebar from '../sidebar/RightSidebar';

export default function FormSidebarRight({
  children,
  initialValues,
  open,
  onOpen,
  onSubmit,
  validationSchema,
  isNewData,
  formName,
  setErrorsForm,
  setTouchedForm
}) {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(isNewData ? `form.${formName}.title.create` : `form.${formName}.title.update`);
  }, [isNewData]);

  return (
    <RightSidebar open={open} onOpen={onOpen}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="space-y-6 overflow-y-auto">
            <SimpleBar style={{ maxHeight: '100%' }} className="h-full">
              <p className="px-8 pt-8 form-header">{t(title)}</p>
              <div className="px-8 pb-24">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    setErrorsForm(errors);
                    setTouchedForm(touched);
                    return React.cloneElement(child, { onOpen, errors, touched });
                  }
                  return child;
                })}
              </div>
            </SimpleBar>

            <div className="absolute bottom-0 right-0 z-30 flex items-center justify-end w-full p-4 px-8 space-x-8 bg-white border-t">
              <button type="button" className="btn-outlined" onClick={() => onOpen(false)}>
                {t('cancel')}
              </button>
              <button type="submit" className="btn-contained">
                {t('save')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightSidebar>
  );
}
