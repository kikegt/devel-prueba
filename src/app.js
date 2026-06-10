const express = require('express');
const cors = require('cors');
const { getMembersWithMostDenials, getHourlyBreakdown, getSuspiciousActivity } = require('./analyzer');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express API is running' });
});
app.get('/api/members/denials', (req, res) => {
  try {
    const result = getMembersWithMostDenials();
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});
app.get('/api/hourly-breakdown', (req, res) => {
  try {
    const result = getHourlyBreakdown();
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('/api/suspicious-activity', (req, res) => {
  try {
    const result = getSuspiciousActivity();
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});
    

module.exports = app;
