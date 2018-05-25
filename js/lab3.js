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
var counter = 0;
var indexCounter = 0;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });
    gcode = new google.maps.Geocoder();
    placeMarker();
} //END OF INITMAP
//CALL LOCAL JSON FILE TO GET PARTIAL ADDRESSES
$.ajax('data/ac-public-places.json', {
    dataType: 'json',
    success: function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            //ADD MAP MARKER TO ARRAY OF MAP MARKERS
            var newMapMarker = new MapMarker(d.address);
            mapMarkers.push(newMapMarker);
        }
    }
});
//PLACE MARKER
function placeMarker() {
    if (indexCounter < mapMarkers.length) {
        var m_1 = mapMarkers[indexCounter];
        gcode.geocode({ 'address': m_1.Address + " Toronto, ON" }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                m_1.LatLong = results[0].geometry.location;
                console.log(status);
                counter++;
                console.log(counter);
                indexCounter++;
                setTimeout(placeMarker, 300); //DELAY THE CALL WHEN SUCCESSFUL TO AVOID REACHING THE LIMIT PER SECOND
            }
            else {
                console.log(status);
                console.log(m_1.Address);
                setTimeout(placeMarker, 1600);
            }
        });
    }
    else {
        for (var _i = 0, mapMarkers_1 = mapMarkers; _i < mapMarkers_1.length; _i++) {
            var m = mapMarkers_1[_i];
            var marker = new google.maps.Marker({
                'title': 'Cool place to be',
                'position': m.LatLong,
                'map': map,
            });
        }
    }
} // END OF PLACEMARKER
