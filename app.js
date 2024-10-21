
const apiKey = "92656ec51cac908946cd72277a742ede"; // Your OpenWeatherMap API key
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const cityNameElem = document.getElementById("cityName");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
const weatherIconElem = document.getElementById("weatherIcon");
const errorMessageElem = document.getElementById("errorMessage");

// Event listener for the form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh
  const cityName = cityInput.value.trim(); // Get the entered city name and trim any extra spaces

  // Check if input is empty
  if (cityName === "") {
    errorMessageElem.textContent = "Please enter a city name!";
    clearWeatherInfo(); // Clear any previously displayed data
    return;
  }

  // Fetch the weather data
  getWeather(cityName);
});

// Function to fetch weather data for the specified city
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch the weather data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Handle errors if the city is not found or if there's an API issue
    if (data.cod === "404") {
      throw new Error("City not found. Please try again.");
    }

    // Display the weather data
    displayWeather(data);
    errorMessageElem.textContent = ""; // Clear any error message
  } catch (error) {
    // Show the error message to the user
    errorMessageElem.textContent = error.message;
    clearWeatherInfo(); // Clear previous weather info if an error occurs
  }
}

// Function to display the fetched weather data
function displayWeather(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description, icon } = data.weather[0];

  // Update the HTML elements with the weather data
  cityNameElem.textContent = name;
  temperatureElem.textContent = `Temperature: ${temp}°C`;
  descriptionElem.textContent = description;
  weatherIconElem.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIconElem.alt = description; // Set alt text for the image
}

// Function to clear the weather information when an error occurs or input is empty
function clearWeatherInfo() {
  cityNameElem.textContent = "";
  temperatureElem.textContent = "";
  descriptionElem.textContent = "";
  weatherIconElem.src = "";
  weatherIconElem.alt = "";
}
