const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.static('public'));

// Data sementara (RAM)
let sensorData = {
  temperature: 0,
  humidity: 0
};

// ROUTE POST /sensor
app.post('/sensor', (req, res) => {
  const { temperature, humidity } = req.body;

  console.log('Data diterima:', req.body);

  if (temperature === undefined || humidity === undefined) {
    return res.status(400).json({
      error: 'Data tidak lengkap'
    });
  }

  sensorData.temperature = temperature;
  sensorData.humidity = humidity;

  res.json({
    status: 'ok',
    data: sensorData
  });
});

// ROUTE GET /data
app.get('/data', (req, res) => {
  res.json(sensorData);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
