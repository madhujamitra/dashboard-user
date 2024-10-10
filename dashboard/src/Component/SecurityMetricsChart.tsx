import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SecurityMetricsChartProps {
  data: {
    trends: {
      lastMonth: number;
      thisMonth: number;
    };
  };
}

const SecurityMetricsChart: React.FC<SecurityMetricsChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Last Month', 'This Month'],
    datasets: [
      {
        label: 'Incident Trends',
        data: [data.trends.lastMonth, data.trends.thisMonth],
        fill: false,
        borderColor: '#3e95cd',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Security Metrics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px' }}> 
 <Line data={chartData} options={options} />
    </div>
 )
};

export default SecurityMetricsChart;