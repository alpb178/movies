/* eslint-disable react/react-in-jsx-scope */
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import PropTypes from 'prop-types';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CardChart = ({ data, options, title, type, actions, onSubmit }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar options={options} data={data} />;
      case 'line':
        return <Line options={options} data={data} />;
      case 'pie':
        return <Pie options={options} data={data} />;
    }
  };

  const onClick = (event) => {
    onSubmit(event, event?.target?.value);
    console.log(event?.target?.value);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow">
      {title ? <h3 className="text-lg font-semibold text-gray-700 float-center">{title}</h3> : null}
      <div className="w-full h-full">{renderChart()}</div>
      <div className="px-1 py-1 ">
        <div className="flex mt-4 items-center">
          {actions && actions?.length > 0
            ? actions.map((action) => (
                <>
                  <div className="flex items-center mr-4">
                    <input
                      id={action}
                      type="radio"
                      value={action}
                      name="inline-radio-group"
                      onChange={(event) => onClick(event)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {action}
                    </label>
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

CardChart.defaultProps = {
  title: '',
  type: 'bar'
};

CardChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  actions: PropTypes.object
};

export default CardChart;
