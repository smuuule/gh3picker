let tracks;

const titleDiv = document.createElement('div');
const artistDiv = document.createElement('div');
const tierDiv = document.createElement('div');
const buttonDiv = document.createElement('div');

async function requestApi(url) {
  const response = await fetch(url);
  return response.json();
}

async function makeRequest() {
  tracks = await requestApi('tracks.json');

  class Track {
    constructor(title, artist, tier) {
      this.title = title;
      this.artist = artist;
      this.tier = tier;
    }
  }
  function randomTrack() {
    if (!(document.getElementById('incBonus').checked)) {
      tracks = tracks.filter((val) => val.Tier !== 'Bonus');
    }
    if (!(document.getElementById('incDownload').checked)) {
      tracks = tracks.filter((val) => val.Tier !== 'Downloadable');
    }

    const rand = Math.floor(Math.random() * tracks.length);

    return new Track(tracks[rand].Title, tracks[rand].Artist, tracks[rand].Tier);
  }

  const track = randomTrack();
  console.log(track);
  titleDiv.innerHTML = `Title: ${track.title}`;
  titleDiv.style.cssText = 'background:#000';
  document.getElementById('content').appendChild(titleDiv);
  artistDiv.innerHTML = `Artist: ${track.artist}`;
  artistDiv.style.cssText = 'background:#000';
  document.getElementById('content').appendChild(artistDiv);
  tierDiv.innerHTML = `Section: ${track.tier}`;
  tierDiv.style.cssText = 'background:#000';
  document.getElementById('content').appendChild(tierDiv);

  buttonDiv.id = 'buttonDiv'
  document.getElementById('content').appendChild(buttonDiv);
}

async function newSong() {

  await makeRequest();

  const newSong = document.createElement('button');
  newSong.innerHTML = 'hate that song >:(';
  newSong.style = 'position: absolute; left: 50%; -ms-transform: translate(-50%); transform: translate(-50%); margin-top: 10px;';
  newSong.onclick = function () { makeRequest(); };
  document.getElementById('buttonDiv').appendChild(newSong);
}

newSong();
