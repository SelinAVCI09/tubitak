const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Kullanıcı kaydı
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (email, password_hash) VALUES (?, ?)';
    connection.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Kayıt hatası:', err);
        return res.status(500).send('Kayıt sırasında bir hata oluştu.');
      }
      res.status(201).send('Kayıt başarılı!');
    });
  } catch (error) {
    res.status(500).send('Sunucu hatası.');
  }
};

// Kullanıcı girişi
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Giriş hatası:', err);
      return res.status(500).send('Giriş sırasında bir hata oluştu.');
    }
    if (results.length === 0) {
      return res.status(401).send('Geçersiz email veya şifre.');
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).send('Geçersiz email veya şifre.');
    }
    // JWT token oluşturma
    const token = jwt.sign({ userId: user.user_id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};
