let form = document.forms.carForm;
let submitButton = document.getElementById("submit-button");
let formTitle = document.getElementById("form-title");
submitButton.innerHTML = /update\//gi.test(location.pathname) ? 'Оновити' : 'Додати';
formTitle.innerHTML = /update\//gi.test(location.pathname) ? 'Оновити машину' : 'Додати машину';

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

let createCar = (data) => {
    console.log(data);
    fetch("/api/cars", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return res.json();
            } else {
                return res.json().then(data => {
                    throw new Error(data.message || "Помилка при обробці запиту");
                });
            }
        })
        .then(data => {
            console.log('Машину додано:', data);
            showAlert("Машину успішно додано до бази даних!", "success");
            form.reset();
        })
        .catch(e => {
            console.error(e);
            showAlert(`Помилка під час додавання машини: ${String(e.message)}`, "danger");
        });
}


let updateCar = (data, id) => {
    fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Помилка під час оновлення машини');
            }
        })
        .then(data => {
            showAlert("Машину успішно оновлено!", "success");
        })
        .catch(e => {
            console.error(e);
            showAlert(`Помилка під час оновлення машини: ${e.message}`, "danger");
        });
};


let validateForm = ({brand, model, price, year, imageUrl}) => {
    let errors = [];

    if (!brand || brand.trim().length === 0) {
        errors.push("Заповніть поле 'Car Brand'");
    }

    if (!model || model.trim().length === 0) {
        errors.push("Заповніть поле 'Car Model'");
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
        errors.push("Поле 'Car Price' повинно містити додатне валідне число");
    }

    if (!year || isNaN(year) || Number(year) <= 0) {
        errors.push("Поле 'Car Year' повинно містити додатне валідне число");
    }

    if (!imageUrl || !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(imageUrl)) {
        errors.push("Поле 'Image URL' повинно містити валідне посилання на фото у форматі .jpg, .jpeg, .png, або .gif");
    }

    return errors;
}

let setInputDisabledState = (form, state = true) => {
    let inputs = form.getElementsByTagName("input");
    for (let el of inputs) {
        el.disabled = state;
    }
}

let setFormData = (data, form) => {
    for (let [key, value] of Object.entries(data)) {
        form.querySelector(`input[name="${key}"]`).value = value;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    const errors = validateForm({
        ...Object.fromEntries(formData.entries())
    });

    if (errors.length > 0) {
        errors.forEach(error => showAlert(error, 'warning'));
    } else {
        if (/update\//gi.test(location.pathname)) {
            updateCar(Object.fromEntries(formData.entries()), location.pathname.split("/").at(-1));
        } else {
            createCar(Object.fromEntries(formData.entries()));
        }
    }
});

if (/update\//gi.test(location.pathname)) {
    console.log('Update')
    let id = location.pathname.split("/").at(-1);

    setInputDisabledState(form, true);

    fetch(`/api/cars/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Помилка завантаження машини');
            }
            return res.json();
        })
        .then(data => {
            setInputDisabledState(form, false);
            setFormData({
                brand: data.brand,
                model: data.model,
                price: data.price,
                year: data.year,
                imageUrl: data.imageUrl
            }, form);
        })
        .catch(e => {
            console.error(e);
            showAlert(`Помилка під час завантаження даних машини: ${String(e)}`, "danger");
        });
}