import PropTypes from 'prop-types';

const EmptyState = ({ children, text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-16 space-y-6">
      <p className="text-2xl text-gray-400 ">{text}</p>
      {children}
    </div>
  );
};

EmptyState.propTypes = {
  children: PropTypes.object,
  text: PropTypes.string
};

export default EmptyState;
