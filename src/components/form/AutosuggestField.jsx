import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Field } from 'formik';
import theme from '@/styles/autosuggest.module.scss';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (data, value, customValue, optionValue) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data?.filter((item) =>
        customValue
          ? item[customValue][optionValue || 'name'].toLowerCase().includes(inputValue)
          : item[optionValue || 'name'].toLowerCase().includes(inputValue)
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion, optionValue) => (
  <div>{suggestion[optionValue || 'name']}</div>
);

const AutosuggestField = ({ name, onSelection, options, customValue, optionValue, ...props }) => {
  const [suggestions, setSuggestions] = useState(options);
  const [value, setValue] = useState('');

  // useEffect(() => {
  //   setValue(props?.value?.name);
  // }, []);

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value: currentValue }) => {
    setSuggestions(getSuggestions(options, currentValue, customValue, optionValue));
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
            renderSuggestion={(suggestion) => {
              return customValue ? (
                <div>{suggestion[customValue][optionValue || 'name']}</div>
              ) : (
                renderSuggestion(suggestion, optionValue)
              );
            }}
            inputProps={{
              placeholder: props.placeholder,
              value,
              name,
              onChange: (e, { newValue }) => {
                setFieldValue(name, newValue);
                setValue(
                  typeof newValue === 'string'
                    ? newValue
                    : customValue
                    ? newValue[customValue][optionValue || 'name']
                    : newValue[optionValue || 'name']
                );
              }
            }}
          />
        </>
      )}
    </Field>
  );
};

export default AutosuggestField;
