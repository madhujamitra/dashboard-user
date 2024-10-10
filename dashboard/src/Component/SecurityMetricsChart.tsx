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
          borderColor: 'rgba(77, 182, 172, 1)', 
          borderDash: [5, 5], 
          backgroundColor: 'rgba(255,255,255,0)', 
          pointBackgroundColor: '#4DB6AC', 
          pointHoverBackgroundColor: '#274653', 
          tension: 0.4,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#274653',
          },
        },
        title: {
          display: true,
          label: 'Security Metrics',
          font: {
            size: 18,
            weight: 'bold' as 'normal' | 'bold' | 'bolder' | 'lighter', 
          },
          color: '#274653',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#274653',
          },
        },
        x: {
          ticks: {
            color: '#274653',
          },
        },
      },
    };
  
    return (
      <div style={{ width: '350px', height: '300px' }}> 
        <Line data={chartData} options={options} />
      </div>
    );
  };
  
  export default SecurityMetricsChart;
  