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
        data: [0, 0, 0], // Initial placeholder data
        backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);  // Specify the type for error state

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/compliance');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        // Set the fetched data
        setData({
          labels: ['Compliance Score', 'Tasks Completed', 'Pending Tasks'],
          datasets: [
            {
              label: 'Compliance Metrics',
              data: [result.complianceScore, result.controlsImplemented, result.pendingTasks],
              backgroundColor: ['#4caf50', '#3e95cd', '#ff6384'],
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError(err as Error);  // Cast the error to the Error type
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Updating data function
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Now error.message is safe to access
  }

  return (
<>
                {/* Navbar with user icon */}
                <nav className="navbar">
                <img src={Icon} alt="Logo" className="dashboard-logo" />
                <div className="navbar-right">
                  <h1>Compliance Dashboard</h1>
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                </div>
              </nav>
    <div className="dashboard">

  
    <div className="dashboard-card">

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
      </section>
  
      {/* Button for Interaction */}
      <button className="update-btn" onClick={updateData}>
        Update Metrics
      </button>
    </div>
  </div>
  </>
  );
};

export default Dashboard;
