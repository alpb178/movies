import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CustomSwitch = ({ checked, label, onChange, onClick }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    onClick={onClick}
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

CustomSwitch.defaultProps = {
  onChange: () => null
};

CustomSwitch.propTypes = {
  onChange: PropTypes.bool
};

export default CustomSwitch;
