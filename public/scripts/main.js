// Fetch data from JSON file
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let cars = data;
        displayCars(cars);
        updateTotalPrice(cars);

        // Search functionality
        const searchInput = document.querySelector('input[type="search"]');
        searchInput.addEventListener('input', function() {
            filterCars();
        });

        // Sort by price
        const sortPriceBtn = document.getElementById('sortPriceBtn');
        sortPriceBtn.addEventListener('click', function() {
            cars.sort((a, b) => a.price - b.price);
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Sort by year
        const sortYearBtn = document.getElementById('sortYearBtn');
        sortYearBtn.addEventListener('click', function() {
            cars.sort((a, b) => a.year - b.year);
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Sort by brand
        const sortBrandBtn = document.getElementById('sortBrandBtn');
        sortBrandBtn.addEventListener('click', function() {
            cars.sort((a, b) => a.brand.localeCompare(b.brand));
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Filter by price and year
        const minPriceInput = document.querySelector('input[placeholder="Min Price"]');
        const maxPriceInput = document.querySelector('input[placeholder="Max Price"]');
        const minYearInput = document.querySelector('input[placeholder="Min Year"]');
        const maxYearInput = document.querySelector('input[placeholder="Max Year"]');

        minPriceInput.addEventListener('input', filterCars);
        maxPriceInput.addEventListener('input', filterCars);
        minYearInput.addEventListener('input', filterCars);
        maxYearInput.addEventListener('input', filterCars);

        // Reset filters
        const resetFiltersBtn = document.querySelector('.btn-danger');
        resetFiltersBtn.addEventListener('click', function() {
            minPriceInput.value = '';
            maxPriceInput.value = '';
            minYearInput.value = '';
            maxYearInput.value = '';
            searchInput.value = '';
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Function to filter cars based on search and price/year filters
        function filterCars() {
            const searchValue = searchInput.value.toLowerCase();
            const minPrice = parseFloat(minPriceInput.value) || 0;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
            const minYear = parseInt(minYearInput.value) || 0;
            const maxYear = parseInt(maxYearInput.value) || Infinity;

            const filteredCars = cars.filter(car =>
                (car.brand.toLowerCase().includes(searchValue) ||
                    car.model.toLowerCase().includes(searchValue)) &&
                car.price >= minPrice && car.price <= maxPrice &&
                car.year >= minYear && car.year <= maxYear
            );
            displayCars(filteredCars);
            updateTotalPrice(filteredCars);
        }
    })
    .catch(error => console.error('Error loading data:', error));

// Function to display cars
function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';
    cars.forEach(car => {
        const carItem = `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img style="max-width: 100%; height: 200px; object-fit: cover;" src="${car.photo_url}" class="card-img-top" alt="${car.brand} ${car.model}">
                <div class="card-body">
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <p class="card-text">Price: $${car.price}</p>
                    <p class="card-text">Year: ${car.year}</p>
                    <p class="card-text">${car.description}</p>
                    <div class="card-buttons">
                        <a href="edit.html?id=${car.id}" class="btn btn-warning">Edit</a>
                        <button class="btn btn-danger" onclick="removeCar(${car.id})">Remove</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        carList.insertAdjacentHTML('beforeend', carItem);
    });
}

// Function to update total price
function updateTotalPrice(cars) {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = cars.reduce((total, car) => total + car.price, 0);
    totalPriceElement.textContent = `$${totalPrice}`;
}

// Function to remove a car (for example purposes, does not affect JSON data)
function removeCar(carId) {
    // Placeholder function for removing a car from the UI
    alert(`Car with ID: ${carId} removed!`);
    // Here, you would implement the actual logic to remove the car from your data source
}
