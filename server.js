// Supa Guru API Server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database for Gurus
let gurus = [];

// Middleware to check API key
const authenticate = (req, res, next) => {
  const apiKey = req.headers.authorization;
  
  // For now, we'll use a simple API key check
  // In production, replace this with a proper authentication mechanism
  if (apiKey === 'Bearer YOUR_API_KEY') {
    next();
  } else {
    res.status(401).json({ error: 'Missing or invalid API key' });
  }
};

// Register a new Guru
app.post('/register', authenticate, (req, res) => {
  const { name, description, capabilities, contact, tags } = req.body;
  
  if (!name || !description || !capabilities || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const guruId = Math.random().toString(36).substring(2, 10);
  const newGuru = { guruId, name, description, capabilities, contact, tags };
  gurus.push(newGuru);
  
  res.status(201).json({ guruId, message: 'Bot registered successfully!' });
});

// Get all Gurus
app.get('/gurus', authenticate, (req, res) => {
  res.json({ gurus });
});

// Get a specific Guru
app.get('/gurus/:guruId', authenticate, (req, res) => {
  const { guruId } = req.params;
  const guru = gurus.find(g => g.guruId === guruId);
  
  if (!guru) {
    return res.status(404).json({ error: 'Guru not found' });
  }
  
  res.json(guru);
});

// Update a Guru
app.put('/gurus/:guruId', authenticate, (req, res) => {
  const { guruId } = req.params;
  const updates = req.body;
  
  const guruIndex = gurus.findIndex(g => g.guruId === guruId);
  
  if (guruIndex === -1) {
    return res.status(404).json({ error: 'Guru not found' });
  }
  
  gurus[guruIndex] = { ...gurus[guruIndex], ...updates };
  res.json({ message: 'Guru updated successfully!' });
});

// Delete a Guru
app.delete('/gurus/:guruId', authenticate, (req, res) => {
  const { guruId } = req.params;
  
  const guruIndex = gurus.findIndex(g => g.guruId === guruId);
  
  if (guruIndex === -1) {
    return res.status(404).json({ error: 'Guru not found' });
  }
  
  gurus.splice(guruIndex, 1);
  res.json({ message: 'Guru removed successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Supa Guru API server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- POST /register: Register a new Guru`);
  console.log(`- GET /gurus: List all Gurus`);
  console.log(`- GET /gurus/{guruId}: Get a specific Guru`);
  console.log(`- PUT /gurus/{guruId}: Update a Guru`);
  console.log(`- DELETE /gurus/{guruId}: Remove a Guru`);
});
