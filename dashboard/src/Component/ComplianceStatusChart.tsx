import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ComplianceStatusChartProps {
  data: number[];
}

const ComplianceStatusChart: React.FC<ComplianceStatusChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Compliance Score', 'Controls Implemented', 'Pending Tasks'],
    datasets: [
      {
        label: 'Compliance Metrics',
        data: data,
        backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
        hoverBackgroundColor: ['#388e3c', '#2e7d32', '#d32f2f'],
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
        text: 'Compliance Status Overview',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ComplianceStatusChart;