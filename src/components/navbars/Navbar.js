/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiOutlineMenuAlt2 as MenuAlt2Icon } from 'react-icons/hi';

const Navbar = ({ onSidebarOpen }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`relative z-10 flex flex-shrink-0 bg-white border-b  h-${
        (NAVBAR_HEIGHT - 28) / 4
      }`}
    >
      {loading && <Loading />}
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
        onClick={() => onSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 px-6">
        <div className="flex flex-1"></div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired
};

export default Navbar;
