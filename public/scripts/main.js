// Fetch data from JSON file
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let cars = data;
        displayCars(cars);
        updateTotalPrice(cars);

        // Search functionality
        const searchInput = document.getElementById('searchInput');
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
        const sortBrandBtn = document.createElement('button');
        sortBrandBtn.textContent = 'Sort by Brand';
        sortBrandBtn.classList.add('btn', 'btn-success', 'me-2');
        document.querySelector('.row.mb-3 .col-md-12').appendChild(sortBrandBtn);
        sortBrandBtn.addEventListener('click', function() {
            cars.sort((a, b) => a.brand.localeCompare(b.brand));
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Sort by model
        const sortModelBtn = document.createElement('button');
        sortModelBtn.textContent = 'Sort by Model';
        sortModelBtn.classList.add('btn', 'btn-warning');
        document.querySelector('.row.mb-3 .col-md-12').appendChild(sortModelBtn);
        sortModelBtn.addEventListener('click', function() {
            cars.sort((a, b) => a.model.localeCompare(b.model));
            displayCars(cars);
            updateTotalPrice(cars);
        });

        // Price range filter
        const minPriceInput = document.createElement('input');
        minPriceInput.type = 'number';
        minPriceInput.placeholder = 'Min Price';
        minPriceInput.classList.add('form-control', 'me-2', 'mb-2');

        const maxPriceInput = document.createElement('input');
        maxPriceInput.type = 'number';
        maxPriceInput.placeholder = 'Max Price';
        maxPriceInput.classList.add('form-control', 'me-2', 'mb-2');

        document.querySelector('.row.mb-3 .col-md-12').append(minPriceInput, maxPriceInput);

        minPriceInput.addEventListener('input', filterCars);
        maxPriceInput.addEventListener('input', filterCars);

        // Year range filter
        const minYearInput = document.createElement('input');
        minYearInput.type = 'number';
        minYearInput.placeholder = 'Min Year';
        minYearInput.classList.add('form-control', 'me-2', 'mb-2');

        const maxYearInput = document.createElement('input');
        maxYearInput.type = 'number';
        maxYearInput.placeholder = 'Max Year';
        maxYearInput.classList.add('form-control', 'me-2', 'mb-2');

        document.querySelector('.row.mb-3 .col-md-12').append(minYearInput, maxYearInput);

        minYearInput.addEventListener('input', filterCars);
        maxYearInput.addEventListener('input', filterCars);

        // Reset filters button
        const resetFiltersBtn = document.createElement('button');
        resetFiltersBtn.textContent = 'Reset Filters';
        resetFiltersBtn.classList.add('btn', 'btn-danger', 'mb-2');
        document.querySelector('.row.mb-3 .col-md-12').appendChild(resetFiltersBtn);
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
                </div>
            </div>
        </div>
        `;
        carList.insertAdjacentHTML('beforeend', carItem);
    });
}

// Function to update total price
function updateTotalPrice(cars) {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cars.reduce((total, car) => total + car.price, 0);
    totalPriceElement.textContent = `Total Price of Cars: $${totalPrice}`;
}
