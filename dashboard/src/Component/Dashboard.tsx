import React, { useState, useEffect } from 'react';
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
        data: [0, 0, 0], 
        backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
        hoverBackgroundColor: ['#388e3c', '#2e7d32', '#d32f2f'],
      },
    ],
  });

  const [riskAssessment, setRiskAssessment] = useState({
    criticalRisks: 0,
    riskScore: '',
  });

  const [securityMetrics, setSecurityMetrics] = useState({
    incidents: 0,
    avgResolutionTime: '',
    trends: { lastMonth: 0, thisMonth: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/compliance');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();


        setData({
          labels: ['Compliance Score', 'Controls Implemented', 'Pending Tasks'],
          datasets: [
            {
              label: 'Compliance Metrics',
              data: [result.complianceScore, result.controlsImplemented, result.pendingTasks],
              backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
              hoverBackgroundColor: ['#388e3c', '#2e7d32', '#d32f2f'],
            },
          ],
        });

        setRiskAssessment(result.riskAssessment);
        setSecurityMetrics(result.securityMetrics);

        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = async () => {
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:3000/api/compliance');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();


      setData({
        labels: ['Compliance Score', 'Controls Implemented', 'Pending Tasks'],
        datasets: [
          {
            label: 'Updated Compliance Metrics',
            data: [result.complianceScore, result.controlsImplemented, result.pendingTasks],
            backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
            hoverBackgroundColor: ['#388e3c', '#2e7d32', '#d32f2f'],
          },
        ],
      });

      setRiskAssessment(result.riskAssessment);
      setSecurityMetrics(result.securityMetrics);
      setShowMetrics(true);  

      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {/* Navbar with user icon */}
      <nav className="navbar">
        <img src={Icon} alt="Logo" className="dashboard-logo" aria-label="Company Logo" />
        <div className="navbar-right">
          <h1>Compliance Dashboard</h1>
          <FontAwesomeIcon icon={faUser} className="user-icon" aria-label="User Icon" />
        </div>
      </nav>
      
      <div className="dashboard">
        <div className="dashboard-card">

          {/* Chart Section */}
          <h2 className="chart-heading">Compliance Metrics Overview</h2>
          <div className="chart-container">
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          {/* Conditionally display the metrics */}
          {showMetrics && (
            <section className="features">
              <div className="feature" aria-label="Compliance Status Overview">
                <h2>Compliance Status Overview</h2>
                <p>Compliance Score: {data.datasets[0].data[0]}%</p>
                <p>Controls Implemented: {data.datasets[0].data[1]}</p>
                <p>Pending Tasks: {data.datasets[0].data[2]}</p>
              </div>

              <div className="feature" aria-label="Risk Assessment">
                <h2>Risk Assessment</h2>
                <p>Critical Risks: {riskAssessment.criticalRisks}</p>
                <p>Risk Score: {riskAssessment.riskScore}</p>
              </div>

              <div className="feature" aria-label="Security Metrics">
                <h2>Security Metrics</h2>
                <p>Incidents: {securityMetrics.incidents}</p>
                <p>Average Resolution Time: {securityMetrics.avgResolutionTime}</p>
                <p>Incident Trends - Last Month: {securityMetrics.trends.lastMonth}, This Month: {securityMetrics.trends.thisMonth}</p>
              </div>
            </section>
          )}

          {/* Button for Interaction */}
          <button className="update-btn" onClick={updateData} aria-label="Update Compliance Metrics">
            {showMetrics ? 'Update Metrics' : 'Show Metrics'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
