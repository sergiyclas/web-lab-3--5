const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Зчитуємо змінні з .env

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

// Підключення до MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware для статичних файлів
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Маршрути
app.use('/api/cars', require('./routes/carRoutes'));

// Відправляємо index.html при запиті до кореневого маршруту
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
app.get("/create", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../public/form.html"))
})
app.get("/update/:id", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../public/form.html"))
})

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Open it in web ....");
    console.log(`http://localhost:${PORT}`);
});