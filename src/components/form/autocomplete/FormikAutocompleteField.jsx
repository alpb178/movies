import { Field } from 'formik';
import PropTypes from 'prop-types';
import AutocompleteField from '.';

const FormikAutocompleteField = ({ name, onSelectionChange, options, ...props }) => {
  const { defaultValue, optionLabels } = props;

  return (
    <Field name={name} id={name}>
      {({ form: { setFieldValue }, meta: { error, touched } }) => (
        <div className="w-full">
          <AutocompleteField
            name={name}
            onChange={(selection) => {
              onSelectionChange(selection);
              setFieldValue(name, selection);
            }}
            options={options}
            initialSelectedItem={defaultValue}
            className={error && touched ? 'border-red-500' : 'border-gray-300'}
            {...props}
          />
          {error?.name && touched ? <p className="mt-1 text-red-500">{error?.name}</p> : null}
        </div>
      )}
    </Field>
  );
};

FormikAutocompleteField.defaultProps = {
  defaul: null,
  disabled: false,
  emptyOptionsLabel: 'No options',
  icon: null,
  onSelectionChange: () => {}
};

FormikAutocompleteField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  emptyOptionsLabel: PropTypes.string,
  icon: PropTypes.node,
  keysToMatch: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  label: PropTypes.string,
  onSelectionChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  optionLabels: PropTypes.arrayOf(PropTypes.string),
  optionValue: PropTypes.string,
  placeholder: PropTypes.string,
  props: PropTypes.object
};

export default FormikAutocompleteField;
