import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import CardChart from './Card';

const BarChart = () => {
  const { t } = useTranslation('common');

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Consumible',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: [30, 78, 56, 34, 100, 45, 13, 60, 80, 90, 17, 75],
        fill: false,
        barThickness: 8
      },
      {
        label: 'Maquinaria',
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: '#ff8000',
        data: [27, 68, 86, 74, 10, 4, 87, 60, 80, 90, 17, 75],
        barThickness: 8
      },
      {
        label: 'PPU',
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: '#9b9b9b',
        data: [27, 68, 86, 74, 10, 4, 87, 60, 80, 90, 17, 75],
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
        title={`${t('regulations', { count: 1 })} ${new Date().getFullYear()}`}
        type="bar"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;
