let tracks;

const titleDiv = document.createElement('div');
const artistDiv = document.createElement('div');
const tierDiv = document.createElement('div');

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
    /*
        Better solution?
    const filtered = tracks.filter((val) => {
      if (document.querySelector('incBonus').checked) { return val.Tier !== 'Bonus'; }
      if (document.querySelector('incDownload').checked) { return val.Tier !== 'Downloadable'; }
      return tracks;
    });
    
        For-loop solution
    for (let i = 0; i < tracks.length; i += 1) {
      if (!(document.getElementById('incBonus').checked) && (tracks[i].Tier === 'Bonus')) { console.log(tracks[i].Title); tracks.splice(i, 1); }
      if (!(document.getElementById('incDownload').checked) && (tracks[i].Tier === 'Downloadable')) { tracks.splice(i, 1); console.log('DOWNLOADABLEEEEE'); }
    }
    */
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
  document.body.appendChild(titleDiv);
  artistDiv.innerHTML = `Artist: ${track.artist}`;
  artistDiv.style.cssText = 'background:#000';
  document.body.appendChild(artistDiv);
  tierDiv.innerHTML = `Section: ${track.tier}`;
  tierDiv.style.cssText = 'background:#000';
  document.body.appendChild(tierDiv);
}

makeRequest();

const newSong = document.createElement('button');
newSong.innerHTML = 'hate that song >:(';
newSong.onclick = function () {
  titleDiv.remove();
  artistDiv.remove();
  tierDiv.remove();
  makeRequest();
};
newSong.style.cssText = 'position: absolute;bottom: 650px;';
document.body.appendChild(newSong);
