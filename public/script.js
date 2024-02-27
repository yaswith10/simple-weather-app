let key;

fetch('/api/secret-key')
  .then(response => response.json())
  .then(data => {
    key = data.key;
  })
  .catch(error => console.error('Error fetching secret key:', error));

const WData = {}; // Weather Data Object

const notificationElement = document.querySelector(".notification");
let lat;
let lon;

//Check if browser supports geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//Set user's position
function setPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat + " " + lon);
  getWeatherData();
}

//show error when there is an issue with geolocation service
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

const getWeatherData = () => {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      WData.city = data.name;
      document.getElementById("city-info").innerHTML = `<span class="material-symbols-rounded">location_on</span>&nbsp;` + WData.city;
      WData.temperataure = data.main.temp;
      document.getElementById("temp-element").innerText = Math.round(WData.temperataure - 273.15) + "°C";
      WData.main = data.weather[0].main;
      document.getElementById('weather-main').innerText = WData.main;
      WData.desc = data.weather[0].description;
      document.getElementById('weather-desc').innerHTML = `' ` + WData.desc + ` '`;
      WData.feelsLike = data.main.feels_like;
      document.getElementById('feels-like').innerHTML = `Feels like ` + Math.round(WData.feelsLike - 273.15) + `°C`;
      console.log(WData);
      WData.icon = data.weather[0].icon;
      document.getElementById('icon-element').innerHTML = `<img src=' https://openweathermap.org/img/wn/10d@2x.png'>`
      WData.min_temp = data.main.temp_min;
      WData.max_temp = data.main.temp_max;
      document.getElementById('min-max-temp').innerHTML = Math.round(WData.max_temp - 273.15) + '°C / ' + Math.round(WData.min_temp - 273.15) + '°C';
      WData.humidity = data.main.humidity;
      document.getElementById('humidity').innerHTML = WData.humidity + ` %`;
      WData.wind_speed = Math.round(data.wind.speed * 3.6);
      document.getElementById('wind-speed').innerHTML = WData.wind_speed + `kmph`;
      WData.sunrise = new Date(data.sys.sunrise * 1000);
      WData.sunset = new Date(data.sys.sunset * 1000);
      document.getElementById('sunrise').innerHTML = `Sunrise: ` + WData.sunrise.getHours() + `:` + WData.sunrise.getMinutes();
      document.getElementById('sunset').innerHTML = `Sunset: ` + WData.sunset.getHours() + `:` + WData.sunset.getMinutes();
      WData.cloudiness = data.clouds.all;
      document.getElementById('cloudiness').innerHTML = WData.cloudiness + `%`;

    })

}

const getWeatherDatabySearch = () => {
  WData.city = document.getElementById("city-name-search").value;
  if (WData.city == '') {
    alert('Enter Valid City Name');
    return;
  }
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${WData.city}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      WData.city = data.name;
      document.getElementById("city-info").innerHTML = `<span class="material-symbols-rounded">location_on</span>&nbsp;` + WData.city;
      WData.temperataure = data.main.temp;
      document.getElementById("temp-element").innerText = Math.round(WData.temperataure - 273.15) + "°C";
      WData.main = data.weather[0].main;
      document.getElementById('weather-main').innerText = WData.main;
      WData.desc = data.weather[0].description;
      document.getElementById('weather-desc').innerHTML = `' ` + WData.desc + ` '`;
      WData.feelsLike = data.main.feels_like;
      document.getElementById('feels-like').innerHTML = `Feels like ` + Math.round(WData.feelsLike - 273.15) + `°C`;
      console.log(WData);
      WData.icon = data.weather[0].icon;
      document.getElementById('icon-element').innerHTML = `<img src=' https://openweathermap.org/img/wn/10d@2x.png'>`
      WData.min_temp = data.main.temp_min;
      WData.max_temp = data.main.temp_max;
      document.getElementById('min-max-temp').innerHTML = Math.round(WData.max_temp - 273.15) + '°C / ' + Math.round(WData.min_temp - 273.15) + '°C';
      WData.humidity = data.main.humidity;
      document.getElementById('humidity').innerHTML = WData.humidity + ` %`;
      WData.wind_speed = Math.round(data.wind.speed * 3.6);
      document.getElementById('wind-speed').innerHTML = WData.wind_speed + `kmph`;
      WData.sunrise = new Date(data.sys.sunrise * 1000);
      WData.sunset = new Date(data.sys.sunset * 1000);
      document.getElementById('sunrise').innerHTML = `Sunrise: ` + WData.sunrise.getHours() + `:` + WData.sunrise.getMinutes();
      document.getElementById('sunset').innerHTML = `Sunset: ` + WData.sunset.getHours() + `:` + WData.sunset.getMinutes();
      WData.cloudiness = data.clouds.all;
      document.getElementById('cloudiness').innerHTML = WData.cloudiness + `%`;

    })

}
