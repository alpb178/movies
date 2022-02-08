import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useAirlines from '@/hooks/airline/useAirlines';
import { POST } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';

const AirlinesForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} />
      </div>
    </div>
  ));

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const initialValues = {
    logo: data?.logo || '',
    name: data?.name || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('required.name'))
  });

  const onSubmit = (values) => {
    useAirlines({
      args: values,
      options: {
        method: POST
      }
    });
    onOpen(false);
  };

  return (
    <FormDialogWrapper
      formName="airline"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <section className="container">
          {thumbs.length === 0 ? (
            <Field name={name} id={name}>
              {({
                field: { value: fieldValue },
                form: { setFieldValue },
                meta: { error, touched }
              }) => (
                <div {...getRootProps({ className: 'bg-gray-100 border-4 border-dashed p-8' })}>
                  <input {...getInputProps()} />
                  <p className="text-lg font-medium text-center text-gray-400">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              )}
            </Field>
          ) : (
            <aside>{thumbs}</aside>
          )}
        </section>
      </div>

      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <Field
          type="text"
          name="name"
          id="name"
          className={`text-field ${
            errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
          }`}
          aria-describedby="name"
        />
        {errors?.name && touched?.name ? (
          <p className="mt-2 text-sm text-red-600">{errors?.name}</p>
        ) : null}
      </div>
    </FormDialogWrapper>
  );
};

AirlinesForm.propTypes = {
  data: PropTypes.object,
  onOpen: PropTypes.func.isRequired
};

export default AirlinesForm;
