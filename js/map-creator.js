import {getPageEnabled} from './page-status-toggler.js';

const map = L.map('map-canvas')
  .on('load', () => {
    getPageEnabled();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
