import { Field } from 'formik';
import PropTypes from 'prop-types';
import AsyncAutocompleteField from '.';

const FormikAsyncAutocompleteField = ({ name, onSelectionChange, options, ...props }) => {
  return (
    <Field name={name} id={name}>
      {({ field: { value }, form: { setFieldValue }, meta: { error, touched } }) => (
        <div className="relative w-full">
          <AsyncAutocompleteField
            name={name}
            onChange={(selection) => {
              onSelectionChange(selection);
              setFieldValue(name, selection);
            }}
            value={value}
            options={options}
            {...props}
          />
          {error && touched ? <p className="mt-1 text-red-500">{error}</p> : null}
        </div>
      )}
    </Field>
  );
};

FormikAsyncAutocompleteField.defaultProps = {
  onSelectionChange: () => {}
};

FormikAsyncAutocompleteField.propTypes = {
  onSelectionChange: PropTypes.func
};

export default FormikAsyncAutocompleteField;
