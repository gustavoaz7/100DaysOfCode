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
  'Thunderstorm': ['wi-thunderstorm', 'url'],
  'Drizzle': ['wi-sprinkle', 'url'],
  'Rain': ['wi-rain', 'url'],
  'Snow': ['wi-snow', 'url'],
  'Atmosphere': ['wi-dust', 'url'],
  '800': [['wi-day-sunny', 'url'], ['wi-night-clear', 'url']],
  '8xx': {'fc': [['wi-day-cloudy', 'url'], ['wi-night-alt-cloudy', 'url']], 'other': ['wi-cloudy', 'url']},
  'xxx': ['wi-na', 'url']
}

setInterval(function() {
  let now = new Date();
  hour.innerHTML = `${now.toString().split(" ")[4].slice(0,5)}`;
  let month = now.getMonth()+1;
  if ((month+"").length === 1) {month = `0${now.getMonth()+1}`};
  week.innerHTML = `${now.toString().split(" ")[0]} ${month}/${now.getDate()}`;
}, 1000);

// Getting Geolocation
const key = '89232155a28e10f6f080b65258157ece';
const geoURL = 'https://freegeoip.net/json/';
let lat, lon;
(fetch(geoURL)
  .then(response => response.json())
    .then(data => {
      lat = data.latitude;
      lon = data.longitude;
      city.innerHTML = data.city;
      country.innerHTML = `${data.region_code}, ${data.country_name}`;

      // Getting Weather Information
      const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`;
      return fetch(weatherURL);
    })
  .then(response => response.json())
    .then(data => {
      tempNow.innerHTML  = `<p>${data.main.temp.toFixed(1)}</p><i class="wi wi-celsius sm"></i>`;
      tempMaxMin.innerHTML = `<p>${data.main.temp_max}</p><i class="wi wi-degrees sm"></i> <p>${data.main.temp_min}</p><i class="wi wi-degrees sm"></i>`;
      humidity.innerHTML = `${data.main.humidity}%`;
      cloudyness.innerHTML = `${data.clouds.all}%`;
      wind.innerHTML = `${(data.wind.speed*3.6).toFixed(1)} km/h`;
      
      // Selecting icon and Background according to the weather
      let main = data.weather[0].main;
      let id = data.weather[0].id;
      let icon = data.weather[0].icon;
      let descript = data.weather[0].description;
      let [i, bg] = getIconAndBackground(main, id, icon, descript);
      weatherIcon.classList.add(i);

      // Getting 5 Day Forecast
      let forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`;
      return fetch(forecastURL);
    })
    .then(response => response.json())
      .then(data => {
        console.log(data);
        let now = new Date();
        let wd = now.getDay();
        for (let i = 0; i < 5; i++) {
          let div = document.createElement('div');
            div.classList.add('fore');
            div.classList.add(`f${i}`);
          let day = document.createElement('p');
            wd++;
            // Back to Sunday after 7 days
            if (wd > 6) wd -= 7;
            day.textContent = weekday[wd];
          let ico = document.createElement('i');
            // Timespan of 3h between every item in the list. Therefore i*8
            let main = data.list[i*8].weather[0].main;
            let id = data.list[i*8].weather[0].id;
            let icon = data.list[i*8].weather[0].icon;
            let descript = data.list[i*8].weather[0].description;
            let [ic, bg] = getIconAndBackground(main, id, icon, descript);
            ico.classList.add('wi');
            ico.classList.add(ic);
          let tem = document.createElement('span');
          div.appendChild(day);
          div.appendChild(ico);
          div.appendChild(tem);
          forecast.appendChild(div);
          document.querySelector(`.f${i} > span`).innerHTML = data.list[i*8].main.temp.toFixed(1);
        };

      })
)

function getIconAndBackground(main, id, icon, descript) {
  let sel;
  if (weather[main]) {return [weather[main][0], weather[main][1]];
  } else if (id === 800) {
      sel = weather[800];
      return icon.includes('d') ? [sel[0][0], sel[0][1]] : [sel[1][0], sel[1][1]];
  } else if (id < 900) {
      sel = weather['8xx'];
      return descript.includes('few clouds') ? 
        icon.includes('d') ? [sel.fc[0][0], sel.fc[0][1]] : [sel.fc[1][0], sel.fc[1][1]] :
      [sel.other[0], sel.other[1]];
  } else {return [weather.xxx[0], weather.xxx[1]];}
}

