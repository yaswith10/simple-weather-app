const express = require('express');
const path = require('path');
require('dotenv').config()
const app = express();




// Serve static files from the "public" directory
app.use(express.static('static'));

// Serve index.html file
app.get('/', (req, res) => {
  // Use path.resolve to get the absolute path of the index.html file
  const indexPath = path.resolve(__dirname, 'static', 'index.html');

  // Send the file using res.sendFile with the absolute path
  res.sendFile(indexPath);
});

app.get('/api/secret-key', (req, res) => {
  res.json({ key: process.env.API_KEY });
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
