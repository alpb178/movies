import { valuesFromString } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Axios from './axios';

const AsyncAutocompleteField = ({ ...props }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setSelectedItem(props.value);
  }, [props.value]);

  const stateChangeHandler = (changes) => {
    let { selectedItem: item = selectedItem, inputValue: value = inputValue } = changes;
    setSelectedItem(item);
    setInputValue(value);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const nextState = { inputValue: value };
    setInputValue(nextState.inputValue);
    // setSelectedItem(nextState.selectedItem);
  };

  return (
    <div>
      <ControlledAutocomplete
        selectedItem={selectedItem}
        inputValue={inputValue}
        onStateChange={stateChangeHandler}
        onInputChange={handleInputChange}
        {...props}
      />
    </div>
  );
};

const ControlledAutocomplete = ({
  label,
  loader: LoaderComponent,
  name,
  options,
  showButton,
  icon,
  disabled,
  onInputChange,
  placeholder,
  emptyOptionsLabel,
  keysToMatch,
  optionLabels,
  baseEndpoint,
  requestParams,
  ...props
}) => {
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
      : i;

  return (
    <Downshift itemToString={itemToString} {...props}>
      {({
        inputValue,
        getInputProps,
        getLabelProps,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
        selectedItem,
        highlightedIndex,
        isOpen,
        clearSelection
      }) => (
        <div className="w-full">
          {label ? <label {...getLabelProps()}>{label}</label> : null}
          <div className={clsx(props.className, 'relative flex items-center')}>
            <div className="absolute text-gray-600">{icon}</div>
            <input
              name={name}
              {...getInputProps({
                placeholder,
                onChange: onInputChange
              })}
              className={clsx('w-full', icon && 'autocomplete-with-icon')}
              disabled={disabled}
              role="textbox"
              aria-label={name}
            />

            {showButton ? (
              selectedItem ? (
                <button
                  type="button"
                  className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                  onClick={() => {
                    clearSelection();
                  }}
                  aria-label="clear selection"
                >
                  <XIcon className="w-5 h-5 text-gray-700" />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                  disabled={disabled}
                  {...getToggleButtonProps()}
                >
                  <ChevronDownIcon
                    className={`${
                      isOpen ? 'rotate-180' : ''
                    } w-5 h-5 transition duration-150 text-gray-500`}
                  />
                </button>
              )
            ) : null}
          </div>

          <Menu as="div" className="relative z-50">
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {(() => {
                if (!isOpen) {
                  return null;
                }

                if (!inputValue) {
                  return (
                    <Menu.Items
                      as="ul"
                      className="menu-items"
                      // {...getMenuProps()}
                    >
                      {options && getItems().length > 0 ? (
                        getItems().map((item, index) => (
                          <Menu.Item
                            as="li"
                            key={item.name}
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
                  );
                }

                return (
                  <Menu.Items as="ul" className="menu-items">
                    <Axios
                      url={baseEndpoint}
                      params={{ q: inputValue.toLowerCase(), ...requestParams }}
                      criteria={keysToMatch ? `${keysToMatch[0]}.contains` : 'name.contains'}
                    >
                      {({ loading, error, data: { rows: items = [] } = {} }) => {
                        if (loading) {
                          return (
                            <Menu.Item as="div">
                              {LoaderComponent ? LoaderComponent : 'Loading...'}
                            </Menu.Item>
                          );
                        }

                        if (error) {
                          return (
                            <Menu.Item as="div" className="p-4 text-red-500">
                              Error! ${error}
                            </Menu.Item>
                          );
                        }

                        if (!items.length) {
                          return (
                            <Menu.Item as="div" className="p-4 text-gray-500">
                              {emptyOptionsLabel}
                            </Menu.Item>
                          );
                        }

                        return items.map((item, index) => (
                          <Menu.Item
                            as="li"
                            key={item?.id || item}
                            {...getItemProps({
                              item: item || item?.name,
                              index,
                              isActive: highlightedIndex === index,
                              isSelected: selectedItem === item
                            })}
                          >
                            {itemToString(item)}
                          </Menu.Item>
                        ));
                      }}
                    </Axios>
                  </Menu.Items>
                );
              })()}
            </Transition>
          </Menu>
        </div>
      )}
    </Downshift>
  );
};

AsyncAutocompleteField.defaultProps = {
  emptyOptionsLabel: 'No options',
  label: null,
  placeholder: '',
  showButton: true
};

AsyncAutocompleteField.propTypes = {
  baseEndpoint: PropTypes.string.isRequired,
  label: PropTypes.string,
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string
};

export default AsyncAutocompleteField;
