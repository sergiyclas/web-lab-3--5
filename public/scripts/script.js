// Обробка створення нового авто
document.getElementById('createCarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Забороняємо стандартну поведінку форми

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value;
    const photo_url = document.getElementById('photo_url').value;

    // Перевірка на правильність введених даних (просто приклад)
    if (!brand || !model || !price || !year || !description || !photo_url) {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }

    // Тут можна додати код для збереження даних (з API або локально)
    alert('Авто успішно створено!'); // Для тесту
});

// Обробка редагування авто (можна зробити схожим чином)
document.getElementById('editCarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Забороняємо стандартну поведінку форми

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value;
    const photo_url = document.getElementById('photo_url').value;

    if (!brand || !model || !price || !year || !description || !photo_url) {
        alert('Будь ласка, заповніть всі поля.');
        return;
    }

    alert('Зміни успішно збережені!'); // Для тесту
});


function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('modal').style.display = 'block';
}

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Використання модального вікна замість alert
document.getElementById('createCarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // ... ваша валідація ...

    showModal('Авто успішно створено!');
});
