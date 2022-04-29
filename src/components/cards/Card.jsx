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
import React from 'react';
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

const CardChart = ({ data, options, title, type }) => {
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

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow">
      {title ? <h3 className="text-lg font-semibold text-gray-700 float-center">{title}</h3> : null}
      <div className="w-full h-full">{renderChart()}</div>
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
  type: PropTypes.string
};

export default CardChart;
