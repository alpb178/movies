import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { Field } from 'formik';
import { matchSorter } from 'match-sorter';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { valuesFromString } from '@/lib/utils';

const AutocompleteField = ({ label, name, onSelectionChange, options, ...props }) => {
  const { defaultValue, disabled, emptyOptionsLabel, keysToMatch, optionLabels, placeholder } =
    props;

  const getItems = (filter) =>
    filter
      ? matchSorter(options, filter, {
          keys: keysToMatch ? keysToMatch : ['name']
        })
      : options;

  const itemToString = (i) =>
    i
      ? optionLabels
        ? optionLabels
            .map((optionLabel) =>
              optionLabel.includes('.') ? valuesFromString(i, optionLabel) : i[optionLabel]
            )
            .join(', ')
        : i.name
      : '';

  return (
    <Field name={name} id={name}>
      {({ field: { value: fieldValue }, form: { setFieldValue }, meta: { error, touched } }) => (
        <Downshift
          onChange={(selection) => {
            onSelectionChange(selection);
            setFieldValue(name, selection);
          }}
          itemToString={itemToString}
          initialSelectedItem={defaultValue}
        >
          {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            getItemProps,
            isOpen,
            clearSelection,
            selectedItem,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <div className="flex flex-col space-y-2">
                {label ? <label {...getLabelProps()}>{label}</label> : null}
                <div className="relative flex items-center">
                  <input
                    {...getInputProps({
                      isOpen,
                      placeholder: placeholder || 'Enter a name'
                    })}
                    className={clsx(
                      props.className,
                      error && touched ? 'border-red-500' : 'border-gray-300'
                    )}
                    disabled={disabled}
                  />
                  {selectedItem ? (
                    <button
                      className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                      onClick={clearSelection}
                      aria-label="clear selection"
                    >
                      <XIcon className="w-6 h-6 text-gray-500" />
                    </button>
                  ) : (
                    <button
                      className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                      {...getToggleButtonProps()}
                      disabled={disabled}
                    >
                      <ChevronDownIcon
                        className={`${
                          isOpen ? 'rotate-180' : ''
                        } w-6 h-6 transition duration-150 text-gray-500`}
                      />
                    </button>
                  )}
                </div>
              </div>

              <Menu as="div" className="relative z-10 text-left">
                <Transition
                  show={isOpen}
                  enter="transition duration-150 ease-out"
                  enterFrom="transform scale-95"
                  enterTo="transform scale-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100"
                  leaveTo="transform scale-95"
                >
                  <Menu.Items className="absolute w-full mt-2 origin-top bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {getItems(inputValue).length > 0 ? (
                      getItems(inputValue).map((item, index) => (
                        <Menu.Item
                          as="div"
                          className="p-4 cursor-pointer hover:bg-secondary-50 hover:text-secondary-700"
                          key={item.id}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item
                          })}
                        >
                          {itemToString(item)}
                        </Menu.Item>
                      ))
                    ) : (
                      <p className="p-4 text-gray-500">{emptyOptionsLabel}</p>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>

              {error && touched ? (
                <p className="mt-2 text-red-500">{error.name || error.toString()}</p>
              ) : null}
            </div>
          )}
        </Downshift>
      )}
    </Field>
  );
};

AutocompleteField.defaultProps = {
  defaul: null,
  disabled: false,
  emptyOptionsLabel: 'No options',
  onSelectionChange: () => {}
};

AutocompleteField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  emptyOptionsLabel: PropTypes.string,
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

export default AutocompleteField;
