import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Icon from '../assets/icon.svg'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    labels: ['Compliance Score', 'Tasks Completed', 'Pending Tasks'],
    datasets: [
      {
        label: 'Compliance Metrics',
        data: [75, 50, 25],
        backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
      },
    ],
  });


  const updateData = () => {
    setData({
      labels: ['Compliance Score', 'Tasks Completed', 'Pending Tasks'],
      datasets: [
        {
          label: 'Updated Compliance Metrics',
          data: [85, 65, 10], 
          backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
        },
      ],
    });
  };

  return (
    <div className="dashboard">
      {/* Navbar with user icon */}
      <nav className="navbar">
        <img src={Icon} alt="Logo" className="dashboard-logo" />
        <div className="navbar-right">
          <h1>Compliance Dashboard</h1>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
      </nav>

      {/* Chart Section */}
      <div className="chart-container">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      {/* Dashboard Features */}
      <section className="features">
        <div className="feature">
          <h2>Compliance Status Overview</h2>
          <p>Display overall compliance status across different frameworks. Show percentage of controls met for each framework.</p>
        </div>
        <div className="feature">
          <h2>Risk Assessment</h2>
          <p>Highlight critical risks and vulnerabilities. Provide a risk score or rating.</p>
        </div>
        <div className="feature">
          <h2>Security Metrics</h2>
          <p>Display key security metrics like number of incidents, average time to resolve. Show trends over time for these metrics.</p>
        </div>
        <div className="feature">
          <h2>Compliance Framework Tracking</h2>
          <p>List relevant compliance frameworks (e.g., GDPR, HIPAA, PCI DSS). Show status and progress for each framework.</p>
        </div>
      </section>

      {/* Button for Interaction */}
      <button className="update-btn" onClick={updateData}>
        Update Metrics
      </button>
    </div>
  );
};

export default Dashboard;