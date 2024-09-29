const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.use('/api/cars', require('./routes/carRoutes'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get("/create", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../public/form.html"));
});

app.get("/update/:id", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../public/form.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Open it in web ....");
    console.log(`http://localhost:${PORT}`);
});
