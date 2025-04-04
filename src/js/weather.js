const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const city = "Park City, Utah"; 
const days = 3;

const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;
console.log("API Key: ", apiKey);


//Formats dates into a more readable format
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

async function getWeather() {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    renderCurrent(data.current, data.location);
    renderForecast(data.forecast.forecastday);
  } catch (error) {
    console.error("Weather fetch error:", error);
    document.getElementById("current-weather").textContent = "Unable to load weather.";
    document.getElementById("forecast-cards").textContent = "";
  }
}

function renderCurrent(current, location) {
  const container = document.getElementById("current-weather");

  container.innerHTML = `
  <div class="weather-card">
    <p><strong>${location.name}, ${location.region}</strong></p>
    <p>${current.temp_f}&deg;F / ${current.temp_c}&deg;C</p>
    <p>${current.condition.text}</p>
    <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
    <p>Feels like: ${current.feelslike_f}&deg;F</p>
    <p>Wind: ${current.wind_mph} mph</p>
  </div>
`;
}

function renderForecast(forecastDays) {
  const container = document.getElementById("forecast-cards");
  container.innerHTML = "";

  forecastDays.forEach(day => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    card.innerHTML = `
      <p><strong>${formatDate(day.date)}</strong></p>
      <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
      <p>${day.day.condition.text}</p>
      <p>High: ${day.day.maxtemp_f}&deg;F</p>
      <p>Low: ${day.day.mintemp_f}&deg;F</p>
    `;

    container.appendChild(card);
  });
}

getWeather();