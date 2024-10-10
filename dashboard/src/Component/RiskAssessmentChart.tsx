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
        backgroundColor: ['#274653', '#80CBC4'], 
        hoverBackgroundColor: ['#5097a7', '#274653'], 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#274653', 
        },
      },
      title: {
        display: true,
        label:""
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '260px' }}> 
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default RiskAssessmentChart;
