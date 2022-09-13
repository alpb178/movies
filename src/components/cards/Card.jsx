/* eslint-disable react/react-in-jsx-scope */
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);

const CardChart = ({ data, options, title, type, actions, onSubmit }) => {
  const [timeFrame, setTimeFrame] = useState(actions[0].value);

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

  const onValueChange = (value) => {
    onSubmit(value);
    setTimeFrame(value);
  };

  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow">
      {title ? <h3 className="text-lg font-semibold text-gray-700 float-center">{title}</h3> : null}
      <div className="w-full h-full">{renderChart()}</div>
      <div className="py-3">
        <RadioGroup value={timeFrame} onChange={(v) => onValueChange(v)} className="h-full">
          <div className="flex w-full gap-12">
            {actions?.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.value}
                className={({ checked }) =>
                  clsx(
                    'cursor-pointer focus:outline-none',
                    checked
                      ? 'border-transparent'
                      : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                    'flex items-center font-medium'
                  )
                }
              >
                {({ checked }) => (
                  <RadioGroup.Label as="p" className="flex items-center space-x-4 ">
                    {checked ? (
                      <CheckCircleIcon className="w-6 h-6 text-secondary-500" />
                    ) : (
                      <div className="m-0.5 h-5 w-5 rounded-full border border-gray-400" />
                    )}
                    <span className="flex text-base font-medium text-gray-800">
                      <span>{t(option.name.split('-')[1])}</span>
                    </span>
                  </RadioGroup.Label>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
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
  actions: PropTypes.object,
  onSubmit: PropTypes.object
};

export default CardChart;

import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useState } from 'react';

function Example() {
  return (
    <div className="w-full px-4 py-16">
      <div className="w-full max-w-md mx-auto"></div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
