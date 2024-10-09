const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random compliance data
const generateComplianceMetrics = () => {
  return {
    complianceScore: getRandomInt(70, 100), // Random number between 70 and 100
    controlsImplemented: getRandomInt(50, 90), // Random number between 50 and 90
    pendingTasks: getRandomInt(0, 20), // Random number between 0 and 20
    frameworks: [
      { name: 'GDPR', compliance: `${getRandomInt(70, 100)}%` },
      { name: 'HIPAA', compliance: `${getRandomInt(70, 100)}%` },
      { name: 'PCI DSS', compliance: `${getRandomInt(60, 90)}%` },
    ],
    riskAssessment: {
      criticalRisks: getRandomInt(0, 5),
      riskScore: ['Low', 'Medium', 'High'][getRandomInt(0, 2)], // Randomly select risk score
    },
    securityMetrics: {
      incidents: getRandomInt(0, 10),
      avgResolutionTime: `${getRandomInt(1, 5)} hours`, // Random number of hours for resolution time
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
