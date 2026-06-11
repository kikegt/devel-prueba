const express = require('express');
const cors = require('cors');
const { getMembersWithMostDenials, getHourlyBreakdown, getSuspiciousActivity, detectRapidDenials } = require('./analyzer');
const path = require('path');
const fs = require('fs');
const { sanitizeLogs } = require('./domain/entities/Logs');
const logs = sanitizeLogs(loadJsonFile('logs.json'));

function loadJsonFile(fileName) {
  const filePath = path.join(__dirname, '../', fileName);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawContent);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express API is running' });
});
app.get('/api/members/denials', (req, res) => {
  try {
    const result = getMembersWithMostDenials(logs);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});
app.get('/api/hourly-breakdown', (req, res) => {
  try {
    const result = getHourlyBreakdown(logs);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/suspicious-activity', (req, res) => {
  try {
    const result = getSuspiciousActivity(logs);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/rapid-denials', (req, res) => {
  try {
    const result = detectRapidDenials(logs, 3, 5);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const membersWithMostDenials = getMembersWithMostDenials(logs);
    const hourlyBreakdown = getHourlyBreakdown(logs);
    const suspiciousActivity = getSuspiciousActivity(logs);

    result = {
      membersWithMostDenials,
      hourlyBreakdown,
      suspiciousActivity
    };
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
