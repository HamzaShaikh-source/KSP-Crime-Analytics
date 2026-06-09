// Crime API - Catalyst Advanced I/O Function
// Serves Karnataka crime data from CSV files as JSON endpoints

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Helper: parse CSV with header row
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').trim();
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, '').replace(/^"(.*)"$/, '$1'));
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle quoted fields with commas
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const ch of lines[i]) {
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else current += ch;
    }
    values.push(current.trim());

    if (values.length === headers.length && values[0] !== '') {
      const row = {};
      headers.forEach((h, idx) => {
        let val = values[idx] || '';
        const num = Number(val);
        row[h.toLowerCase().replace(/[\s/]+/g, '_')] = isNaN(num) || val === '' ? val : num;
      });
      result.push(row);
    }
  }
  return result;
}

// Load data at startup
const dataDir = path.join(__dirname, '..', '..', '..', 'data');
const CACHE = {};

try {
  CACHE.ipc2024 = parseCSV(path.join(dataDir, 'ka-ipc-crimes-2024.csv'));
  CACHE.ipc2025 = parseCSV(path.join(dataDir, 'ka-ipc-crimes-2025.csv'));
  CACHE.sll2024 = parseCSV(path.join(dataDir, 'ka-sll-crimes-2024.csv'));
  CACHE.sll2025 = parseCSV(path.join(dataDir, 'ka-sll-crimes-2025.csv'));
  CACHE.district2024 = parseCSV(path.join(dataDir, 'ka-district-wise-2024.csv'));
  CACHE.district2025 = parseCSV(path.join(dataDir, 'ka-district-wise-2025.csv'));
  CACHE.review2025 = parseCSV(path.join(dataDir, 'ka-crime-review-dec-2025.csv'));
  console.log(`Loaded ${Object.values(CACHE).reduce((s, a) => s + a.length, 0)} crime records`);
} catch(e) {
  console.error('Data load error:', e.message);
}

// Routes
app.get('/', (req, res) => {
  res.json({
    service: 'KSP Crime Analytics API',
    version: '1.0',
    endpoints: [
      '/api/v1/ipc/:year',
      '/api/v1/sll/:year',
      '/api/v1/districts/:year',
      '/api/v1/review',
      '/api/v1/summary',
    ]
  });
});

// IPC crimes by year
app.get('/ipc/:year', (req, res) => {
  const data = req.params.year === '2025' ? CACHE.ipc2025 : CACHE.ipc2024;
  res.json({ year: req.params.year, count: data?.length || 0, data: data || [] });
});

// SLL crimes by year
app.get('/sll/:year', (req, res) => {
  const data = req.params.year === '2025' ? CACHE.sll2025 : CACHE.sll2024;
  res.json({ year: req.params.year, count: data?.length || 0, data: data || [] });
});

// District data by year
app.get('/districts/:year', (req, res) => {
  const data = req.params.year === '2025' ? CACHE.district2025 : CACHE.district2024;
  res.json({ year: req.params.year, count: data?.length || 0, data: data || [] });
});

// Crime review (monthly comparison)
app.get('/review', (req, res) => {
  res.json({ count: CACHE.review2025?.length || 0, data: CACHE.review2025 || [] });
});

// Summary statistics
app.get('/summary', (req, res) => {
  const dist = CACHE.district2025 || [];
  const totalIPC = dist.reduce((s, d) => s + (d.ipc_bns_crimes || d.ipc_crimes || 0), 0);
  const totalSLL = dist.reduce((s, d) => s + (d.sll_crimes || 0), 0);

  const ipc2025 = CACHE.ipc2025 || [];
  const murderData = ipc2025.filter(r => r.heads_of_crime?.toLowerCase().includes('murder'));
  const cyberData = ipc2025.filter(r => r.heads_of_crime?.toLowerCase().includes('cyber'));

  res.json({
    total_ipc_crimes: totalIPC,
    total_sll_crimes: totalSLL,
    district_count: dist.length,
    data_sources: ['IPC 2024', 'IPC 2025', 'SLL 2024', 'SLL 2025', 'District 2024', 'District 2025', 'Crime Review Dec 2025'],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
