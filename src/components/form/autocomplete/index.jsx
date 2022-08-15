import { valuesFromString } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import PropTypes from 'prop-types';

const AutocompleteField = ({ label, name, onChange, options, ...props }) => {
  const {
    defaultValue,
    disabled,
    emptyOptionsLabel,
    icon,
    keysToMatch,
    optionLabels,
    placeholder
  } = props;

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
    <Downshift onChange={onChange} itemToString={itemToString} initialSelectedItem={defaultValue}>
      {({
        getLabelProps,
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex
      }) => (
        <div className="w-full" {...getToggleButtonProps()}>
          {label ? (
            <label {...getLabelProps()} className="mb-2">
              {label}
            </label>
          ) : null}
          <div className={clsx(props.className, 'relative flex items-center')}>
            <div className="absolute text-gray-600">{icon}</div>
            <input
              name={name}
              {...getInputProps({
                isOpen,
                placeholder: placeholder || 'Enter a name'
              })}
              className={clsx('w-full', icon && 'autocomplete-with-icon')}
              disabled={disabled}
              role="textbox"
              aria-label={name}
            />
            {selectedItem ? (
              <button
                type="button"
                className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <button
                type="button"
                className="absolute p-1 rounded-full right-2 hover:bg-gray-100"
                disabled={disabled}
              >
                <ChevronDownIcon
                  className={`${
                    isOpen ? 'rotate-180' : ''
                  } w-5 h-5 transition duration-150 text-gray-700`}
                />
              </button>
            )}
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
              className="relative z-40"
            >
              <Menu.Items
                as="ul"
                className="menu-items"
                // {...getMenuProps()}
              >
                {getItems(inputValue).length > 0 ? (
                  getItems(inputValue).map((item, index) => (
                    <Menu.Item
                      as="li"
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
        </div>
      )}
    </Downshift>
  );
};

AutocompleteField.defaultProps = {
  defaul: null,
  disabled: false,
  emptyOptionsLabel: 'No options',
  icon: null,
  onSelectionChange: () => {}
};

AutocompleteField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  emptyOptionsLabel: PropTypes.string,
  icon: PropTypes.node,
  keysToMatch: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  optionLabels: PropTypes.arrayOf(PropTypes.string),
  optionValue: PropTypes.string,
  placeholder: PropTypes.string,
  props: PropTypes.object
};

export default AutocompleteField;
