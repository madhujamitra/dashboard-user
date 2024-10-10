import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RiskAssessmentChartProps {
  data: {
    criticalRisks: number;
    nonCriticalRisks: number;
  };
}

const RiskAssessmentChart: React.FC<RiskAssessmentChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Critical Risks', 'Non-Critical Risks'],
    datasets: [
      {
        label: 'Risk Assessment',
        data: [data.criticalRisks, data.nonCriticalRisks],
        backgroundColor: ['#ff6384', '#36a2eb'],
        hoverBackgroundColor: ['#d32f2f', '#1976d2'],
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
        text: 'Risk Assessment',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default RiskAssessmentChart;