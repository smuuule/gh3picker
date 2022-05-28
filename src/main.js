let tracks;
async function requestApi(url) {
  const response = await fetch(url);
  return await response.json();
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
    const len = tracks.length;
    const rand = Math.floor(Math.random() * len);

    return new Track(tracks[rand].Title, tracks[rand].Artist, tracks[rand].Tier);
  }

  const track = randomTrack();
  console.log(track);
  const div1 = document.createElement('div');
  div1.innerHTML = `Title: ${  track.title}`;
  document.body.appendChild(div1);
  const div2 = document.createElement('div');
  div2.innerHTML = `Artist: ${  track.artist}`;
  document.body.appendChild(div2);
  const div3 = document.createElement('div');
  div3.innerHTML = `Section: ${  track.tier}`;
  document.body.appendChild(div3);
}
makeRequest();
