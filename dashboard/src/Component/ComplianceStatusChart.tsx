import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ComplianceStatusChartProps {
  data: number[];
}

const ComplianceStatusChart: React.FC<ComplianceStatusChartProps> = ({ data }) => {
  const chartRef = useRef<any>(null); 

  const chartData = {
    labels: ['Compliance Score', 'Controls Implemented', 'Pending Tasks'],
    datasets: [
      {
        label: 'Compliance Metrics',
        data: data,
        backgroundColor: ['#4DB6AC', '#5097a7', '#80CBC4'], 
        hoverBackgroundColor: ['#4DB6AC', '#5097a7', '#80CBC4'], 
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;

      // Create a gradient for the bars
      const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
      gradient1.addColorStop(0, '#4DB6AC');
      gradient1.addColorStop(1, '#274653');

      const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
      gradient2.addColorStop(0, '#5097a7');
      gradient2.addColorStop(1, '#3c6371');

      const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
      gradient3.addColorStop(0, '#80CBC4');
      gradient3.addColorStop(1, '#5097a7');

   
      chart.data.datasets[0].backgroundColor = [gradient1, gradient2, gradient3];

      chart.update();
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        label: 'Compliance Status Overview',
        color: '#274653', 
        font: {
          size: 18,
          weight: 'bold' as const, 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#274653', 
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#274653',
        },
      },
    },
  };

  return (
    <div style={{ width: '350px', height: '300px' }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ComplianceStatusChart;
