const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const city = "Park City, UT";
const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

async function updateHomeTemp() {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    const temp = Math.round(data.current.temp_f);
    const iconUrl = `https:${data.current.condition.icon}`;
    const conditionText = data.current.condition.text;

    // Update temperature
    const tempElement = document.getElementById("todays-temp");
    if (tempElement) {
      tempElement.innerHTML = `${temp}&deg;`;
    }

    // Update weather icon
    const iconElement = document.getElementById("weather-icon");
    if (iconElement) {
      iconElement.src = iconUrl;
      iconElement.alt = conditionText;
    }

  } catch (err) {
    console.error("Failed to load home weather:", err);
  }
}

updateHomeTemp();