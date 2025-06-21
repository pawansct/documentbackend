const express = require('express');
const app = express();
const uploadRoutes = require('./routes/uploadRoute');


const dotenv = require('dotenv')
dotenv.config();

app.use(express.json());
app.use('/api', uploadRoutes);


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
