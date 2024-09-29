const Car = require('../models/Car');

const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні машин' });
    }
};

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
