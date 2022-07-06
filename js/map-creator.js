import {getPageEnabled} from './page-status-toggler.js';
import {generatedData, cardsFragment} from './cards-html-creator.js';

const addressField = document.querySelector('#address');
const START_POINT = {
  lat: 35.6895000,
  lng: 139.6917100,
};

const map = L.map('map-canvas')
  .on('load', () => {
    getPageEnabled();
  })
  .setView({
    lat: START_POINT.lat,
    lng: START_POINT.lng,
  }, 8);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const marker = L.marker(
  {
    lat: START_POINT.lat,
    lng: START_POINT.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const markerLayer = L.layerGroup().addTo(map);

const createAdsMarker = (pointsData, index) => {
  const {location} = pointsData;
  const adsMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    }
  );
  adsMarker
    .addTo(markerLayer)
    .bindPopup(cardsFragment.children[index]);
};

generatedData.forEach((pointsData, index) => {
  createAdsMarker(pointsData, index);
});

marker.addTo(markerLayer);
addressField.value = `${START_POINT.lat.toFixed(5)}, ${START_POINT.lng.toFixed(5)}`;

marker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


