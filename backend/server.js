const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateComplianceMetrics = () => {
  return {
    complianceScore: getRandomInt(70, 100),
    controlsImplemented: getRandomInt(50, 90),
    pendingTasks: getRandomInt(0, 20),
    frameworks: [
      { name: 'GDPR', compliance: `${getRandomInt(70, 100)}%` },
      { name: 'HIPAA', compliance: `${getRandomInt(70, 100)}%` },
      { name: 'PCI DSS', compliance: `${getRandomInt(60, 90)}%` },
      { name: 'ISO 27001', compliance: `${getRandomInt(60, 95)}%` },
      { name: 'SOC 2', compliance: `${getRandomInt(60, 100)}%` },
    ],
    riskAssessment: {
      criticalRisks: getRandomInt(0, 5),
      nonCriticalRisks: getRandomInt(5, 15),
      riskScore: ['Low', 'Medium', 'High'][getRandomInt(0, 2)],
    },
    securityMetrics: {
      incidents: getRandomInt(0, 10),
      avgResolutionTime: `${getRandomInt(1, 5)} hours`,
      incidentTypes: [
        { type: 'Phishing', count: getRandomInt(0, 5) },
        { type: 'Malware', count: getRandomInt(0, 5) },
        { type: 'Data Breach', count: getRandomInt(0, 5) },
      ],
      trends: {
        lastMonth: getRandomInt(0, 10),
        thisMonth: getRandomInt(0, 10),
      },
    },
  };
};

app.get('/api/compliance', (req, res) => {
  const complianceMetrics = generateComplianceMetrics();
  res.json(complianceMetrics);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
