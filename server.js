const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.json());
app.get('/apikey/:service', (req, res) => {
  const service = req.params.service.toLowerCase();
  const filePath = path.join(__dirname, `${service}.json`);
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Terjadi kesalahan membaca file!' });
      }
      const apiKey = JSON.parse(data).apikey;
      return res.json({ apiKey });
    });
  } else {
    return res.status(404).json({ error: 'API key untuk layanan ini tidak ditemukan!' });
  }
});
app.get('/', (req, res) => {
  res.send('Selamat datang di server API Key!');
});
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
