// controllers/carController.js
const Car = require('../models/Car');

// GET /api/cars - отримати всі машини
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні машин' });
    }
};

// GET /api/cars/:id - отримати машину за ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Машину не знайдено' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні машини' });
    }
};

// POST /api/cars - створити нову машину
const createCar = async (req, res) => {
    const { brand, model, year, price, imageUrl } = req.body;

    if (!brand || !model || !year || !price || !imageUrl) {
        return res.status(400).json({ message: 'Будь ласка, надайте всі необхідні дані' });
    }

    try {
        const newCar = new Car({ brand, model, year, price, imageUrl });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при створенні машини' });
    }
};


// PUT /api/cars/:id - оновити машину за ID
const updateCar = async (req, res) => {
    const { brand, model, year, price, imageUrl } = req.body;

    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { brand, model, price, year, imageUrl },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ message: 'Машину не знайдено' });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні машини' });
    }
};

// DELETE /api/cars/:id - видалити машину за ID
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Машину не знайдено' });
        }
        res.status(200).json({ message: 'Машину успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні машини' });
    }
};

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
