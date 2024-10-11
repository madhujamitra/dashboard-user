import React, { useState, useEffect } from 'react';
import ComplianceStatusChart from './ComplianceStatusChart';
import RiskAssessmentChart from './RiskAssessmentChart';
import SecurityMetricsChart from './SecurityMetricsChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Icon from '../assets/icon.svg';
import Content from './Content';

interface DashboardData {
  complianceScore: number;
  controlsImplemented: number;
  pendingTasks: number;
  riskAssessment: {
    criticalRisks: number;
    nonCriticalRisks: number;
  };
  securityMetrics: {
    trends: {
      lastMonth: number;
      thisMonth: number;
    };
  };
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/compliance');
        if (!response.ok) throw new Error('Network response was not ok');

        const result: DashboardData = await response.json();
        setDashboardData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!dashboardData) return <div className="no-data">No data available</div>;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <img src={Icon} alt="Company Logo" className="dashboard-logo" />
        <div className="navbar-right">
          <h1>Compliance Dashboard</h1>
          <FontAwesomeIcon icon={faUser} className="user-icon" aria-label="User profile" />
        </div>
      </nav>

      <main className="dashboard">
        <section className="dashboard-card">
          <h2>Compliance Status Overview</h2>
          <div className="chart-container">
            <ComplianceStatusChart data={[dashboardData.complianceScore, dashboardData.controlsImplemented, dashboardData.pendingTasks]} />
          </div>

        </section>

        <section className="dashboard-card">
          <h2>Risk Assessment</h2>
          <div className="chart-container">
            <RiskAssessmentChart data={dashboardData.riskAssessment} />
          </div>
        </section>

        <section className="dashboard-card">
          <h2>Security Metrics</h2>
          <div className="chart-container">
            <SecurityMetricsChart data={dashboardData.securityMetrics} />
          </div>
        </section>
        <section className="dashboard-card-last">
          <div className="responsive-flex">
          <div >
            <Content
              title="Develop"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              icon="database"
            />
          </div>

          <div >
            <Content
              title="Analysis"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              icon="chart"
            />
          </div>
          </div>
      
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
