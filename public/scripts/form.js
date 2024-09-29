const carForm = document.getElementById("car-form");

carForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(carForm);
    const carData = Object.fromEntries(formData.entries());

    let method = carData._id ? "PUT" : "POST";
    let url = carData._id ? `/api/cars/${carData._id}` : `/api/cars`;

    try {
        let response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });

        let result = await response.json();
        if (response.ok) {
            alert("Автомобіль успішно збережено");
            window.location.href = "/";
        } else {
            alert("Помилка при збереженні автомобіля: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Сталася помилка. Спробуйте ще раз!");
    }
});
