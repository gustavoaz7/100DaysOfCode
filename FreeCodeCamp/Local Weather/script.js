const city = document.querySelector('.city');
const country = document.querySelector('.country')
const hour = document.querySelector('.hour')
const week = document.querySelector('.week')
const weatherIcon = document.querySelector('.weather > i')
const tempNow = document.querySelector('.tempNow')
const tempMaxMin = document.querySelector('.tempMaxMin')
const humidity = document.querySelector('.humidity')
const cloudyness = document.querySelector('.cloudyness')
const wind = document.querySelector('.wind')
//document.querySelector('*').style.color = '#eee';
const info = document.querySelector('.info')
const forecast = document.querySelector('.forecast')

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weather = {
  'Thunderstorm': 'wi-thunderstorm',
  'Drizzle': 'wi-sprinkle',
  'Rain': 'wi-rain',
  'Snow': 'wi-snow',
  'Atmosphere': 'wi-dust',
  '800': ['wi-day-sunny', 'wi-night-clear'],
  '8xx': {'fc': ['wi-day-cloudy', 'wi-night-alt-cloudy'], 'other': 'wi-cloudy'},
  'xxx': 'wi-na'
}

setInterval(function() {
  let now = new Date();
  hour.innerHTML = `${now.toString().split(" ")[4].slice(0,5)}`;
  let month = now.getMonth()+1;
  if ((month+"").length === 1) {month = `0${now.getMonth()+1}`};
  week.innerHTML = `${now.toString().split(" ")[0]} ${month}/${now.getDate()}`;
}, 1000);

// Getting Geolocation

const geoURL = 'https://freegeoip.net/json/';
let lat, lon;

(fetch(geoURL).then(response => response.json())
  .then(data => {
    lat = data.latitude;
    lon = data.longitude;
    city.innerHTML = data.city;
    country.innerHTML = `${data.region_code}, ${data.country_name}`;

    // Getting Weather Information
    const key = '89232155a28e10f6f080b65258157ece';
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`
    console.log(weatherURL);
    (fetch(weatherURL).then(response => response.json())
      .then(data => {
        tempNow.innerHTML  = `<p>${data.main.temp.toFixed(1)}</p><i class="wi wi-celsius sm"></i>`;
        tempMaxMin.innerHTML = `<p>${data.main.temp_max}</p><i class="wi wi-degrees sm"></i> <p>${data.main.temp_min}</p><i class="wi wi-degrees sm"></i>`;
        humidity.innerHTML = `${data.main.humidity}%`;
        cloudyness.innerHTML = `${data.clouds.all}%`;
        wind.innerHTML = `${data.wind.speed*3.6} km/h`;
        
        // Selecting the right icon according to the weather
        let main = data.weather[0].main;
        let id = data.weather[0].id;
        let icon = data.weather[0].icon;
        let descript = data.weather[0].description;
        let actual;
        if (weather[main]) {actual = weather[main]
        } else if (id === 800) { actual = (
            icon.includes('d') ? weather[800][0] : weather[800][1] )
        } else if (id < 900) { actual = (
            descript.includes('few clouds') ? 
              icon.includes('d') ? weather['8xx']['fc'][0] : weather['8xx']['fc'][1] :
            weather['8xx']['other'] )
        } else {actual = weather['xxx']}
        weatherIcon.classList.add(actual);
    })
    );
  })
);



/*
coord
coord.lon City geo location, longitude
coord.lat City geo location, latitude
weather (more info Weather condition codes)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
weather.description Weather condition within the group
weather.icon Weather icon id
base Internal parameter
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
main.humidity Humidity, %
main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa
wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
wind.deg Wind direction, degrees (meteorological)
clouds
clouds.all Cloudiness, %
rain
rain.3h Rain volume for the last 3 hours
snow
snow.3h Snow volume for the last 3 hours
dt Time of data calculation, unix, UTC
sys
sys.type Internal parameter
sys.id Internal parameter
sys.message Internal parameter
sys.country Country code (GB, JP etc.)
sys.sunrise Sunrise time, unix, UTC
sys.sunset Sunset time, unix, UTC
id City ID
name City name
cod Internal parameter


<i class="wi wi-night-sleet"></i>

tempMax:  wi-thermometer
tempMin:  wi-thermometer-exterior
celsius:  wi-celsius
fahrenheit:  wi-fahrenheit





id 2xx - Thunderstorm (unique icon)
    wi-thunderstorm

id 3xx - Drizzle (unique icon)
    wi-sprinkle

id 5xx - Rain (unique icon)
    wi-rain

id 6xx - Snow (unique icon)
    wi-snow

id 7xx - Atmosphere (unique icon - ~mist)
    wi-dust

id 800 - Clear (day icon / night icon)
    wi-day-sunny      wi-night-clear

id 80x - Clouds ('few clouds' day/night  --  others unique icon)
    wi-day-cloudy   wi-night-alt-cloudy         wi-cloudy

id 9xx - Extreme / Additional
    wi-na

*/