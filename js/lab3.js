"use strict";
//WHEN MAKING A CLASS YOU SHOULD HAVE A CONSTRUCTOR
var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.Address = address;
    }
    return MapMarker;
}());
var Toronto = {
    //Original Coordinates from the lab
    // lat : 43,
    // lng : -79.38
    lat: 43.653226,
    lng: -79.383184
};
var map;
var mapMarkers = [];
var gcode;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });
}
