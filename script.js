  async function getWeather() {
  const apiKey = "ba9af792a9eb346e1a6db5b3b9e4e727";
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    
    const data = await response.json();
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { all: cloudiness } = data.clouds;

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <img class="icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p>${temp}°C, ${description}</p>
      <div class="details">
        <div class="detail">
          <img src="https://img.icons8.com/ios-filled/50/000000/humidity.png" alt="Humidity icon">
          <span>Humidity: ${humidity}%</span>
        </div>
        <div class="detail">
          <img src="https://img.icons8.com/ios-filled/50/000000/wind.png" alt="Wind speed icon">
          <span>Wind Speed: ${speed} m/s</span>
        </div>
        <div class="detail">
          <img src="https://img.icons8.com/ios-filled/50/000000/atmospheric-pressure.png" alt="Pressure icon">
          <span>Pressure: ${pressure} hPa</span>
        </div>
        <div class="detail">
          <img src="https://img.icons8.com/ios-filled/50/000000/cloud.png" alt="Cloudiness icon">
          <span>Cloudiness: ${cloudiness}%</span>
        </div>
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>City not found. Please try again.</p>";
  }
}
