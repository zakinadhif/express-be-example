const express = require('express');
const dotenv = require('dotenv');

const studentApi = require('./api');

// Isi variable process.env dengan konten file .env
dotenv.config();

// Ambil port dari process.env
const PORT = process.env["PORT"] ?? 8080;
const HOSTNAME = process.env["HOSTNAME"] ?? "127.0.0.1";

// Buat express app dengan json parser
const app = express();
app.use(express.json());

// Mount student api pada /students
app.use('/students', studentApi);

// Jalankan aplikasi pada http://$HOSTNAME:$PORT/
app.listen(PORT, HOSTNAME, () => {
  console.log(`Example app listening at http://${HOSTNAME}:${PORT}/`);
})

