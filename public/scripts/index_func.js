document.getElementById('refresh-button').addEventListener('click', function() {
    location.reload(); // Оновлює сторінку
});

const sortByPriceCheckbox = document.getElementById("sortPriceBtn");
const sortByYearCheckbox = document.getElementById("sortYearBtn");
const sortByBrandCheckbox = document.getElementById("sortBrandBtn");
const carContainer = document.getElementById("car-data-container");
const searchCarInput = document.getElementById("search-car-input");
const calculateSummaryPriceBtn = document.getElementById("countTotalPriceBtn");
const deletionModal = new bootstrap.Modal('#deletion-modal', {
    backdrop: true, keyboard: false
})
const deletionActionButton = document.getElementById("delete-action-button");
const deletionDiscardButton = document.getElementById("delete-discard-button");

deletionModal.hide();

let cars = [];
let current = [];
let carInModal = null;

let showAlert = (message, type = 'warning') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show fixed-bottom w-75`;
    alertDiv.style.bottom = '0';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = "translateX(-50%)";
    alertDiv.style.zIndex = '1050';

    alertDiv.innerHTML = `
        <div class="container">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

let fetchData = async () => {
    let carResponse = await fetch("/api/cars");
    let data = await carResponse.json();
    cars = data;
    current = JSON.parse(JSON.stringify(data));
}

let drawCards = (data) => {
    carContainer.innerHTML = "";

    for (let car of data) {
        carContainer.insertAdjacentHTML("beforeend", `
        <div class="col-md-4 mb-4">
            <div class="card" style="width: 100%;">
                <img src="${car.imageUrl}"
                    class="card-img-top object-fit-cover"
                    height="180"
                    alt="${car.brand} ${car.model}">
                <div class="card-body">
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <p class="card-text">Ціна: ${car.price} грн</p>
                    <p class="card-text"><b class="fw-bold">Рік</b>: ${car.year}</p>
                    <button class="btn btn-primary" id="edit-car-${car._id}">Редагувати</button>
                    <button class="btn btn-danger" id="delete-car-${car._id}">Видалити</button>
                </div>
            </div>
        </div>
        `);

        // Додаємо обробники подій для кнопок редагування та видалення
        let editButton = document.getElementById(`edit-car-${car._id}`);
        editButton.addEventListener("click", (e) => {
            let link = document.createElement("a");
            link.href = `/update/${car._id}`;
            link.click();
        });

        let deleteButton = document.getElementById(`delete-car-${car._id}`);
        deleteButton.addEventListener("click", (e) => {
            deletionModal.toggle();
            carInModal = car._id;
        });
    }
}


let sortByPrice = (cars) => cars.sort((a, b) => a.price - b.price);
let searchResult = (data, query) => data.filter(item => new RegExp(query, "gi").test(`${item.brand} ${item.model}`));
let calculateSummaryPrice = (data) => data.reduce((acc, val) => acc + val.price, 0).toFixed(2);

sortByPriceCheckbox.addEventListener("input", () => {
    searchCarInput.value = "";

    if (sortByPriceCheckbox.checked) {
        current = sortByPrice(current);
    } else {
        current = JSON.parse(JSON.stringify(cars));
    }
    drawCards(current);
});

searchCarInput.addEventListener("input", (e) => {
    current = searchResult(cars, e.target.value.trim());

    drawCards(current);
});

calculateSummaryPriceBtn.addEventListener("click", (e) => {
    document.getElementById("totalPrice").innerHTML = calculateSummaryPrice(current);
});

deletionDiscardButton.addEventListener("click", () => carInModal = null);
deletionActionButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`/api/cars/${carInModal}`, { method: "DELETE" });
        const data = await response.json();

        deletionModal.hide();

        if (response.status === 200) {
            showAlert("Автомобіль успішно видалено", "success");
            await fetchData();  // Оновлюємо дані після видалення
            drawCards(current);
        } else {
            showAlert("Помилка при видаленні автомобіля. Спробуйте ще раз!", "warning");
        }
    } catch (error) {
        console.error("Помилка при видаленні автомобіля:", error);
        showAlert("Помилка при видаленні автомобіля. Спробуйте ще раз!", "danger");
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    await fetchData();
    drawCards(current);
});

sortByPriceCheckbox.addEventListener("click", () => {
    current = sortByPrice(cars);
    drawCards(current);
});

sortByYearCheckbox.addEventListener("click", () => {
    current = cars.sort((a, b) => a.year - b.year);
    drawCards(current);
});

sortByBrandCheckbox.addEventListener("click", () => {
    current = cars.sort((a, b) => a.brand.localeCompare(b.brand));
    drawCards(current);
});

