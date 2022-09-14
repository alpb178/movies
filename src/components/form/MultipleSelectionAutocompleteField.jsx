import { valuesFromString } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Downshift from 'downshift';
import { Field } from 'formik';
import { matchSorter } from 'match-sorter';
import PropTypes from 'prop-types';
import { useState } from 'react';

const MultiDownshift = ({
  render,
  name,
  children = render,
  onSelect,
  onChange,
  itemToString,
  defaultValue,
  ...props
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: ''
        };
      default:
        return changes;
    }
  };

  const handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      if (onSelect) {
        onSelect(selectedItems, getStateAndHelpers(downshift));
      }
      if (onChange) {
        onChange(selectedItems, getStateAndHelpers(downshift));
      }
    };
    if (selectedItems.includes(selectedItem)) {
      removeItem(selectedItem, callOnChange);
    } else {
      addSelectedItem(selectedItem, callOnChange);
    }
  };

  const removeItem = (item, cb) => {
    setSelectedItems((items) => items.filter((i) => i !== item), cb);
  };

  const addSelectedItem = (item, cb) => {
    setSelectedItems((items) => [...items, item], cb);
  };

  const getRemoveButtonProps = ({ onClick, item, ...rest } = {}) => {
    return {
      onClick: (e) => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e);
        e.stopPropagation();
        removeItem(item);
      },
      ...rest
    };
  };

  const getStateAndHelpers = (downshift) => {
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift
    };
  };

  // TODO: compose together props (rather than overwriting them) like downshift does
  return (
    <Field name={name} id={name}>
      {({ field: { value: fieldValue }, form: { setFieldValue }, meta: { error, touched } }) => (
        <Downshift
          {...props}
          stateReducer={stateReducer}
          onChange={(selection) => {
            handleSelection(selection);
            setFieldValue(name, [...fieldValue, selection]);
          }}
          itemToString={itemToString}
          initialSelectedItem={defaultValue}
        >
          {(downshift) => children(getStateAndHelpers(downshift))}
        </Downshift>
      )}
    </Field>
  );
};

const MultipleSelectionAutocompleteField = ({
  className,
  placeholder,
  options,
  optionLabels,
  keysToMatch,
  name,
  defaultValue,
  noOptionsLabel,
  labelSeparator
}) => {
  const handleChange = (selectedItems) => {
    console.log({ selectedItems });
  };

  const itemToString = (i) =>
    i
      ? optionLabels
        ? optionLabels
            .map((optionLabel) =>
              optionLabel.includes('.') ? valuesFromString(i, optionLabel) : i[optionLabel]
            )
            .join(labelSeparator || ', ')
        : i.name
      : '';

  const getItems = (filter) =>
    filter
      ? matchSorter(options, filter, {
          keys: keysToMatch ? keysToMatch : ['name']
        })
      : options;

  return (
    <div>
      <MultiDownshift
        onChange={handleChange}
        itemToString={itemToString}
        defaultValue={defaultValue}
        name={name}
      >
        {({
          getInputProps,
          getToggleButtonProps,
          getMenuProps,
          // note that the getRemoveButtonProps prop getter and the removeItem
          // action are coming from MultiDownshift composibility for the win!
          getRemoveButtonProps,
          removeItem,

          isOpen,
          inputValue,
          selectedItems,
          getItemProps,
          highlightedIndex
        }) => (
          <div className="relative w-full m-auto">
            <div className="relative flex items-center">
              <input
                {...getInputProps({
                  onKeyDown(event) {
                    if (event.key === 'Backspace' && !inputValue) {
                      removeItem(selectedItems[selectedItems.length - 1]);
                    }
                  },
                  isOpen,
                  placeholder: placeholder || 'Enter a name'
                })}
                className={clsx(
                  'flex flex-1 border-0 outline-none mb-2',
                  className
                  //   error && touched ? 'border-red-500' : 'border-gray-300'
                )}
              />
              <button
                type="button"
                className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                {...getToggleButtonProps()}
              >
                <ChevronDownIcon
                  className={`${
                    isOpen ? 'rotate-180' : ''
                  } w-6 h-6 transition duration-150 text-gray-500`}
                />
              </button>
            </div>

            <div className="flex flex-wrap items-center w-full">
              {selectedItems.length > 0 &&
                selectedItems.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between p-1 px-3 m-1 space-x-4 rounded-full bg-primary-50"
                  >
                    <p className="text-primary-800">{itemToString(item)}</p>
                    <button {...getRemoveButtonProps({ item })}>
                      <XIcon className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                ))}
            </div>

            <Menu>
              <Transition
                show={isOpen}
                enter="transition duration-150 ease-out"
                enterFrom="transform scale-95"
                enterTo="transform scale-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100"
                leaveTo="transform scale-95"
              >
                <Menu.Items className="absolute z-50 mt-2 overflow-y-scroll origin-top bg-white rounded-md shadow-lg max-h-48 w-max focus:outline-none">
                  {getItems(inputValue).length > 0 ? (
                    getItems(inputValue).map((item, index) => (
                      <Menu.Item
                        as="div"
                        key={item.id}
                        className="p-4 cursor-pointer hover:bg-primary-50 hover:text-primary-700"
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItems.includes(item)
                        })}
                      >
                        {itemToString(item)}
                      </Menu.Item>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">{noOptionsLabel}</p>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </MultiDownshift>
    </div>
  );
};

MultipleSelectionAutocompleteField.defaultProps = {
  disabled: false,
  noOptionsLabel: 'No options',
  onSelectionChange: () => null
};

MultipleSelectionAutocompleteField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  noOptionsLabel: PropTypes.string,
  keysToMatch: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onSelectionChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  optionLabels: PropTypes.arrayOf(PropTypes.string),
  optionValue: PropTypes.string,
  placeholder: PropTypes.string,
  props: PropTypes.object
};

export default MultipleSelectionAutocompleteField;
