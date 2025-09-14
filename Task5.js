const apiKey = "3c15e743eb764ad395953217251409"; 
const getWeatherBtn = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();

    weatherResult.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>Temperature: ${data.current.temp_c} °C</p>
      <p>Weather: ${data.current.condition.text}</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind Speed: ${data.current.wind_kph} kph</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});
