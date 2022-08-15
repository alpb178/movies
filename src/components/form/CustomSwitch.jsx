import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

const CustomSwitch = ({ checked, label, onChange }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={clsx(
      checked ? 'bg-primary-500' : 'bg-gray-300',
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
    )}
  >
    <span className="sr-only">{label}</span>
    <span
      aria-hidden="true"
      className={clsx(
        checked ? 'translate-x-5' : 'translate-x-0',
        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
      )}
    />
  </Switch>
);

export default CustomSwitch;
