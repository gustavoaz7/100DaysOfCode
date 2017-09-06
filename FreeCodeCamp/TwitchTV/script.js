const userIDs = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", 'garenatw', 'silvername', 'nooneboss'];
const key = '6uwh8hhynrxszcavv8ksp03v0dj5iq';
let users = [];
const update = document.querySelector('#update');
const list = document.querySelector('#list');

getChannels();

// If checked: Automatically update every 30s
update.addEventListener('change', () => {
  if (update.checked) {
    setInterval(getChannels, 30000);
  }
})

function populateList (array) {
  // Cleaning list before populating it
  while (list.firstChild) {list.removeChild(list.firstChild)};
  
  for (let i = 0; i < array.length; i++) {
    // STYLE FIRST THAN CONTINUElist.innerHTML += `<li>`
  }
}


function getChannels() {
  userIDs.map((id, i) => {
    let URL = `https://api.twitch.tv/kraken/streams/${id}?client_id=${key}`;
    fetch(URL).then(response => response.json())
    .then(data => {
      if (data.stream === null) {
        users[i] = {
          name: userIDs[i],
          online: false,
          logo: 'http://www.offworldgames.com/wp-content/uploads/2015/07/twitch.jpeg'
        }
      } else {
        users[i] = {
          name: userIDs[i],
          online: true,
          game: data.stream.channel.game,
          language: data.stream.channel.language,
          followers: data.stream.channel.followers,
          url: data.stream.channel.url
        }
      }
    })
  }); 
}

/*
http://www.offworldgames.com/wp-content/uploads/2015/07/twitch.jpeg

https://www.twitch.tv/p/assets/uploads/glitch_474x356.png

https://pbs.twimg.com/profile_images/509073338191183872/fYdty6yd.png
*/