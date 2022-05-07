import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Downshift from 'downshift';
import { Field } from 'formik';
import { matchSorter } from 'match-sorter';
import React from 'react';

const MultiDownshift = ({ render, name, children = render, ...props }) => {
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
      const { onSelect, onChange } = props;
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
    setState(({ items }) => {
      return {
        selectedItems: items.filter((i) => i !== item)
      };
    }, cb);
  };

  const addSelectedItem = (item, cb) => {
    setState(
      ({ items }) => ({
        selectedItems: [...items, item]
      }),
      cb
    );
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
          stateReducer={Reducer}
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

class MultipleSelectionAutocompleteField extends React.Component {
  input = React.createRef();

  handleChange = (selectedItems) => {
    console.log({ selectedItems });
  };

  render() {
    const { className, placeholder, options, optionLabels, keysToMatch, name } = props;

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

    const getItems = (filter) =>
      filter
        ? matchSorter(options, filter, {
            keys: keysToMatch ? keysToMatch : ['name']
          })
        : options;

    return (
      <div>
        <MultiDownshift onChange={handleChange} itemToString={itemToString} name={name}>
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
            highlightedIndex,
            toggleMenu
          }) => (
            <div className="relative w-full m-auto">
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  toggleMenu();
                  !isOpen && input.current.focus();
                }}
              >
                <div className="relative flex items-center">
                  <input
                    {...getInputProps({
                      ref: input,
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
                      } icon-bold h-4 w-4 text-gray-500 transition duration-150`}
                    />
                  </button>
                </div>

                <div className="flex flex-wrap items-center w-full">
                  {selectedItems.length > 0 &&
                    selectedItems.map((item) => (
                      <div
                        key={item?.id}
                        className="flex items-center p-1 px-4 space-x-2 rounded-full bg-secondary-100 text-secondary-600"
                      >
                        <span>{item?.name}</span>
                        <button {...getRemoveButtonProps({ item })}>
                          <XIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                </div>
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
                    {isOpen
                      ? getItems(inputValue).map((item, index) => (
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
                      : null}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </MultiDownshift>
      </div>
    );
  }
}

export default MultipleSelectionAutocompleteField;
