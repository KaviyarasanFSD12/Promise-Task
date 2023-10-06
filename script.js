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
  
