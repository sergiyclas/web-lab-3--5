const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);
