import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Field } from 'formik';
import theme from '@/styles/autosuggest.module.scss';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (data, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data?.filter((item) => item.name.toLowerCase().includes(inputValue));
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
const AutosuggestField = ({ name, onSelection, options, ...props }) => {
  const [suggestions, setSuggestions] = useState(options);
  const [value, setValue] = useState('');
  console.log(options)

  // useEffect(() => {
  //   setValue(props?.value?.name);
  // }, []);

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value: currentValue }) => {
    setSuggestions(getSuggestions(options, currentValue));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Field name={name} id={name}>
      {({ field: { value: fieldValue }, form: { setFieldValue }, meta: { error } }) => (
        <>
          <Autosuggest
            theme={theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={(event, { suggestionValue }) =>
              onSelection && onSelection(suggestionValue)
            }
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: props.placeholder,
              value,
              name,
              onChange: (e, { newValue }) => {
                setFieldValue(name, newValue);
                setValue(typeof newValue === 'string' ? newValue : newValue?.name);
              }
            }}
          />
        </>
      )}
    </Field>
  );
};

export default AutosuggestField;
