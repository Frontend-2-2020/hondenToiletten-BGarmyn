import axios from "axios";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import '../styles/index.scss';



var map = L.map('map', {
    center: [51.0535001, 3.7244905],
    zoom: 12
});

var dogIcon = L.icon({
    iconUrl: '/public/marker.png',

    iconSize: [31, 41], // size of the icon
    iconAnchor: [3.875, 10.25], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



axios.get('https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson')
    .then(function(response) {
        console.log(response);
        var data = response.data;


        setMarkers(data);
    });


function setMarkers(data) {
    var coordinates = data.coordinates;
    for (var x = 0; x < coordinates.length; x++) {

        var positie = coordinates[x];

        var marker = L.marker([positie[1], positie[0]], { icon: dogIcon }).addTo(map);

    }

}