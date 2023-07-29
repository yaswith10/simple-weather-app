/*
{
  "coord": {
    "lon": 0,
    "lat": 0
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 297.3,
    "feels_like": 297.73,
    "temp_min": 297.3,
    "temp_max": 297.3,
    "pressure": 1018,
    "humidity": 75,
    "sea_level": 1018,
    "grnd_level": 1018
  },
  "visibility": 10000,
  "wind": {
    "speed": 6.09,
    "deg": 162,
    "gust": 6.1
  },
  "clouds": {
    "all": 100
  },
  "dt": 1690101182,
  "sys": {
    "sunrise": 1690092166,
    "sunset": 1690135790
  },
  "timezone": 0,
  "id": 6295630,
  "name": "Globe",
  "cod": 200
}
*/

const key = "b2336d8d4aa2bedd2959f09024e363b7";

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
  console.log(lat+" "+lon);
  getWeatherData();
}
//show error when there is an issue with geolocation service
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

const getWeatherData = ()=>{
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  fetch(api)
  .then(function(response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  .then(function(data) {
      console.log(data);
      WData.city = data.name;
      document.getElementById("city-info").innerHTML = `<span class="material-symbols-rounded">location_on</span>&nbsp;`+WData.city;
      WData.temperataure = data.main.temp;
      document.getElementById("temp-element").innerText = Math.round(WData.temperataure - 273.15) + "°C";
      WData.main = data.weather[0].main;
      document.getElementById('weather-main').innerText = WData.main;
      WData.desc = data.weather[0].description;
      document.getElementById('weather-desc').innerHTML= `' `+WData.desc+` '`;
      WData.feelsLike = data.main.feels_like;
      document.getElementById('feels-like').innerHTML = `Feels like `+Math.round(WData.feelsLike- 273.15)+`°C`;
      console.log(WData);
      WData.icon = data.weather[0].icon;
      document.getElementById('icon-element').innerHTML = `<img src=' https://openweathermap.org/img/wn/10d@2x.png'>`
      WData.min_temp = data.main.temp_min;
      WData.max_temp = data.main.temp_max;
      document.getElementById('min-max-temp').innerHTML = Math.round(WData.max_temp- 273.15)+'°C / '+Math.round(WData.min_temp- 273.15)+'°C';
      WData.humidity = data.main.humidity;
      document.getElementById('humidity').innerHTML = WData.humidity + ` %`;
      WData.wind_speed = Math.round(data.wind.speed*3.6);
      document.getElementById('wind-speed').innerHTML = WData.wind_speed+`kmph`;
      WData.sunrise = new Date(data.sys.sunrise * 1000);
      WData.sunset = new Date(data.sys.sunset * 1000);
      document.getElementById('sunrise').innerHTML = `Sunrise: `+WData.sunrise.getHours()+`:`+WData.sunrise.getMinutes();
      document.getElementById('sunset').innerHTML = `Sunset: `+WData.sunset.getHours()+`:`+WData.sunset.getMinutes();
      WData.cloudiness = data.clouds.all;
      document.getElementById('cloudiness').innerHTML = WData.cloudiness+`%`;

  })
}

const getWeatherDatabySearch = () =>{
    WData.city =  document.getElementById("city-name-search").value;
    if(WData.city ==''){
      alert('Enter Valid City Name');
      return;
    }
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${WData.city}&appid=${key}`;
  fetch(api)
  .then(function(response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  .then(function(data) {
      console.log(data);
      WData.city = data.name;
      document.getElementById("city-info").innerHTML = `<span class="material-symbols-rounded">location_on</span>&nbsp;`+WData.city;
      WData.temperataure = data.main.temp;
      document.getElementById("temp-element").innerText = Math.round(WData.temperataure - 273.15) + "°C";
      WData.main = data.weather[0].main;
      document.getElementById('weather-main').innerText = WData.main;
      WData.desc = data.weather[0].description;
      document.getElementById('weather-desc').innerHTML= `' `+WData.desc+` '`;
      WData.feelsLike = data.main.feels_like;
      document.getElementById('feels-like').innerHTML = `Feels like `+Math.round(WData.feelsLike- 273.15)+`°C`;
      console.log(WData);
      WData.icon = data.weather[0].icon;
      document.getElementById('icon-element').innerHTML = `<img src=' https://openweathermap.org/img/wn/10d@2x.png'>`
      WData.min_temp = data.main.temp_min;
      WData.max_temp = data.main.temp_max;
      document.getElementById('min-max-temp').innerHTML = Math.round(WData.max_temp- 273.15)+'°C / '+Math.round(WData.min_temp- 273.15)+'°C';
      WData.humidity = data.main.humidity;
      document.getElementById('humidity').innerHTML = WData.humidity + ` %`;
      WData.wind_speed = Math.round(data.wind.speed*3.6);
      document.getElementById('wind-speed').innerHTML = WData.wind_speed+`kmph`;
      WData.sunrise = new Date(data.sys.sunrise * 1000);
      WData.sunset = new Date(data.sys.sunset * 1000);
      document.getElementById('sunrise').innerHTML = `Sunrise: `+WData.sunrise.getHours()+`:`+WData.sunrise.getMinutes();
      document.getElementById('sunset').innerHTML = `Sunset: `+WData.sunset.getHours()+`:`+WData.sunset.getMinutes();
      WData.cloudiness = data.clouds.all;
      document.getElementById('cloudiness').innerHTML = WData.cloudiness+`%`;

  })

}