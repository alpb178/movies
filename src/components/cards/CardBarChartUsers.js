/* eslint-disable react/react-in-jsx-scope */
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import CardChart from './Card';

const BarChart = ({ data }) => {
  const { t } = useTranslation('common');

  const info = {
    labels: data?.labels,
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: data?.count,
        fill: false,
        barThickness: 8
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: false,
      text: 'Orders Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    legend: {
      labels: {
        fontColor: '#000000'
      },
      align: 'end',
      position: 'bottom'
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: 'rgba(33, 37, 41, 0.3)',
            zeroLineColor: 'rgba(33, 37, 41, 0.3)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: false,
            labelString: ''
          },
          gridLines: {
            borderDash: [2],
            drawBorder: true,
            borderDashOffset: [2],
            color: 'rgba(33, 37, 41, 0.2)',
            zeroLineColor: 'rgba(33, 37, 41, 0.15)',
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          }
        }
      ]
    }
  };

  return (
    <div className="relative flex flex-col w-full mt-5 min-w-0 mb-4 break-words bg-white rounded shadow">
      <CardChart
        title={`${t('users', { count: 2 })} ${new Date().getFullYear()}`}
        type="bar"
        data={info}
        options={options}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default BarChart;
