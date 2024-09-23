// Обробка редагування авто
document.getElementById('editCarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Забороняємо стандартну поведінку форми

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value;
    const photo_url = document.getElementById('photo_url').value;

    // Перевірка на правильність введених даних
    if (!brand || !model || !price || !year || !description || !photo_url) {
        showModal('Будь ласка, заповніть всі поля.');
        return;
    }

    showModal('Авто успішно відредаговано!'); // Для тесту
});

// Функція для показу модального вікна
function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
}

document.getElementById('closeModal').addEventListener('click', function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
    modal.hide();
});
