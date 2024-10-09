const express = require('express');
const cors = require('cors');  // Import CORS
const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for all routes

const complianceMetrics = {
  complianceScore: 85,
  controlsImplemented: 60,
  pendingTasks: 15,
  frameworks: [
    { name: 'GDPR', compliance: '80%' },
    { name: 'HIPAA', compliance: '90%' },
    { name: 'PCI DSS', compliance: '70%' }
  ],
  riskAssessment: {
    criticalRisks: 3,
    riskScore: 'High',
  },
  securityMetrics: {
    incidents: 5,
    avgResolutionTime: '2 hours',
    trends: {
      lastMonth: 7,
      thisMonth: 5,
    },
  },
};

app.get('/api/compliance', (req, res) => {
  res.json(complianceMetrics);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
