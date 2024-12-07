const mysql = require('mysql2');

// Veritabanı bağlantısını oluşturma
const connection = mysql.createConnection({
  host: 'localhost', // veya veritabanı sunucunuzun IP adresi
  user: 'root', // veritabanı kullanıcı adınız
  password: '', // veritabanı şifreniz
  database: 'diary', // veritabanı adınız
});

// Bağlantıyı başlatma
connection.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantısı hatası:', err);
  } else {
    console.log('Veritabanına başarıyla bağlanıldı.');
  }
});

module.exports = connection;
