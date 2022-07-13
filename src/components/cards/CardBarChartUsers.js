/* eslint-disable react/react-in-jsx-scope */
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import CardChart from './Card';

const BarChart = ({ data, actions, onSubmit, title, type }) => {
  const { t } = useTranslation('common');

  const info = {
    labels: data?.labels,
    datasets: [
      {
        label: 'Cantidad',
        data: data?.count,
        fill: true,
        barThickness: 8,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  const options = {
    maintainAspectRatio: true,
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
        fontColor: 'rgb(0,0,255)'
      },
      align: 'end',
      position: 'bottom'
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            borderDash: [5],
            borderDashOffset: [5],
            color: 'rgb(0,0,255)',
            backgroundColor: 'rgb(0,0,255)',
            zeroLineColor: 'rgb(0,0,255)',
            zeroLineBorderDash: [5],
            zeroLineBorderDashOffset: [5],
            borderColor: 'rgba(75,192,192,1)'
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: ''
          },
          gridLines: {
            borderDash: [5],
            drawBorder: true,
            borderDashOffset: [2],
            color: 'rgb(0, 0, 0)',
            zeroLineColor: 'rgb(0, 0, 0)',
            zeroLineBorderDash: [5],
            zeroLineBorderDashOffset: [5]
          }
        }
      ]
    }
  };

  return (
    <div className="relative flex flex-col w-full mt-5 min-w-0 mb-4 break-words bg-white rounded shadow">
      <CardChart
        title={title}
        type={type}
        data={info}
        actions={actions}
        onSubmit={onSubmit}
        options={options}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default BarChart;
