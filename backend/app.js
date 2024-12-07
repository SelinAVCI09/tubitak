const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

// Route'ları kullanma
app.use('/api/auth', authRoutes);

app.listen(4200, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
}); 