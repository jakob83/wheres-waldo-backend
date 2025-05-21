const express = require('express');
const runRouter = require('./routes/runRouter');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const allowlist = process.env.CORS_ORIGIN.split(',');
console.log(allowlist);

function corsOptionsDelegate(req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}
app.use('/runs', cors(corsOptionsDelegate), runRouter);

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
