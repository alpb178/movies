import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import React from 'react';

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <div className="z-40 flex items-center justify-end space-x-4">
      {onEdit ? (
        <button
          type="button"
          className="p-1 rounded-full hover:bg-blue-100 hover:text-blue-500"
          id="buttonEdit"
          onClick={onEdit}
        >
          <PencilIcon className="w-6 h-6" />
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          className="p-1 rounded-full hover:bg-red-100 hover:text-red-500"
          id="buttonDelete"
          onClick={onDelete}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      ) : null}
    </div>
  );
};

TableActions.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default TableActions;
