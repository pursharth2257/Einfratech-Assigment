const apiKey = "1e3e8f230b6064d27976e41163a82b77"; 
let isCelsius = true;

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        const data = await response.json();
        displayWeather(data);
        changeBackground(data.weather[0].main);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {

    document.getElementById("errorMessage").classList.add("hidden");

   
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").innerText = data.main.temp.toFixed(1);
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("windSpeed").innerText = (data.wind.speed * 3.6).toFixed(1);

    
    document.getElementById("weatherInfo").classList.remove("hidden");
}

function changeBackground(weatherCondition) {
    let backgroundUrl = "";

   
    switch (weatherCondition.toLowerCase()) {
        case "clear":
        case "clear sky":
            backgroundUrl = "images/clear-sky.jpg";
            break;
        case "clouds":
        case "few clouds":
        case "overcast clouds":
        case "broken clouds":
        case "scattered clouds":
            backgroundUrl = "images/clouds.jpg";
            break;
        case "rain":
        case "shower rain":
        case "light rain":
            backgroundUrl = "images/rain.jpg";
            break;
        case "thunderstorm":
            backgroundUrl = "images/thunderstorm.jpg";
            break;
        case "snow":
            backgroundUrl = "images/snow.jpg";
            break;
        case "mist":
        case "fog":
        case "haze":
            backgroundUrl = "images/fog.jpg";
            break;
        default:
            backgroundUrl = "images/default.avif";  
            break;
    }


    document.body.style.backgroundImage = `url(${backgroundUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";  
    document.body.style.transition = "background 1s ease-in-out"; 
}




function toggleTemperature() {
    const tempElement = document.getElementById("temperature");
    const tempUnit = document.getElementById("tempUnit");
    let temp = parseFloat(tempElement.innerText);

    if (isCelsius) {
        temp = (temp * 9/5) + 32;
        tempElement.innerText = temp.toFixed(1);
        tempUnit.innerText = "F";
    } else {
        temp = (temp - 32) * 5/9;
        tempElement.innerText = temp.toFixed(1);
        tempUnit.innerText = "C";
    }

    isCelsius = !isCelsius;
}

function showError(message) {
    const errorElement = document.getElementById("errorMessage");
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
    document.getElementById("weatherInfo").classList.add("hidden");
}
