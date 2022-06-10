import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';
import DialogWrapper from './DialogWrapper';

const DeleteConfirmationDialog = ({ content, onOpen, open, title, onDeleteConfirmation }) => {
  const { t } = useTranslation('common');

  return (
    <DialogWrapper open={open} onClose={() => onOpen({ open: false })} title={title}>
      <>
        <p className="py-4 text-gray-500">{content}</p>

        <div className="flex justify-end mt-4 space-x-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 font-medium border rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => onOpen({ open: false })}
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={() => {
              onDeleteConfirmation();
              onOpen({ open: false });
            }}
          >
            {t('delete')}
          </button>
        </div>
      </>
    </DialogWrapper>
  );
};

DeleteConfirmationDialog.defaultProps = {
  title: 'delete'
};

DeleteConfirmationDialog.propTypes = {
  content: PropTypes.string.isRequired,
  onDeleteConfirmation: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string
};

export default DeleteConfirmationDialog;
