const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Example endpoint to retrieve debit cards
app.get('/debit-cards', (req, res) => {
  res.json([{ id: 1, cardType: 'Debit', balance: 1000 }, { id: 2, cardType: 'Credit', balance: 2000 }]);
});

// Endpoint to handle provider state changes
app.post('/_pactSetup', (req, res) => {
  console.log('Setting up provider state:', req.body);
  // Perform any setup needed for provider state here
  res.sendStatus(200); // Respond with 200 OK
});

// Start the server
app.listen(PORT, () => {
  console.log(`Provider service running at http://localhost:${PORT}/`);
});
