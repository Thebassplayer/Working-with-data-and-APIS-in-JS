// Making a map and Tiles

const myMap = L.map('issMap').setView([0, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(myMap);

// Making a marker with a custom icon

const issIcon = L.icon({
  iconUrl: 'ISS.png',
  iconSize: [50, 32],
  iconAnchor: [25, 60],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTimeView = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  const { latitude, longitude, velocity, altitude } = data;
  marker.setLatLng([latitude, longitude]);
  if (firstTimeView) {
    myMap.setView([latitude, longitude], 3);
    firstTimeView = false;
  }

  document.getElementById('lat').innerText = latitude.toFixed(2);
  document.getElementById('long').innerText = longitude.toFixed(2);
  document.getElementById('vel').innerText = parseInt(velocity);
  document.getElementById('alt').innerText = parseInt(altitude * 10000);
}

getISS();

setInterval(getISS, 1000);
