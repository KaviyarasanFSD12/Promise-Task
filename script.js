console.log("API")
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      const countryObject = {
        ...element,
        name: element.name.common,
        flags: element.flags.png,
        population: element.population,
        region: element.region,
        capital: element.capital,
        countryCode: element.cca3 ? element.cca3 : "no countrycode",
      };
      createCountryCard(countryObject);
    });
  })
  .catch((err) => console.log("error : ", err));
  
  const fetchWeatherButton = document.getElementById("fetchWeather");
 
fetchWeatherButton.addEventListener("click", async () => {
  try {
    const weatherData = await fetchWeatherData(city);
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
 
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 
  try {
    const response = await fetch(apiUrl);
 
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
 
function displayWeather(weatherData) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;
}

    

   
  

function createCountryCard(element) {
    document.body.innerHTML += `
            <div class="container">
            <img id="flag" src="${element.flags}" alt="${element.name}"/>
            <div class="info">
            <h2>${element.name}</h2>
            <p><span>Population : ${element.population}</span></p>
            <p><span>Region : ${element.region}</span></p>
            <p><span>Capital : ${element.capital}</span></p>
            <p><span>Country Code : ${element.countryCode}</span></p>
            <button onclick="${getWeather(element.name)}">Check Weather</button>
            </div>
            </div>
            `;
  }
  