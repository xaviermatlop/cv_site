const express = require('express');
const cors = require('cors');
const cvRouter = require('./routes/cv');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the router for standard endpoints
app.use('/api/cv', cvRouter);
app.use('/api/cv.php', cvRouter);

// Root path message for easy status checks
app.get('/', (req, res) => {
  res.send('API running on Node.js/Express');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
