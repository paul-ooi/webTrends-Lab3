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
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });
} //END OF INITMAP
//GET ADDRESSES FROM THE JSON
$.ajax('data/ac-public-places.json', {
    dataType: 'json',
    success: function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var d = data_1[_i];
            // console.log(d);
            //ADD MAP MARKER TO ARRAY OF MAP MARKERS
            var newMapMarker = new MapMarker(d.address);
            mapMarkers.push(newMapMarker);
        }
        console.log(mapMarkers);
    },
    complete: function () {
        var _loop_1 = function (m) {
            var query = encodeURI('https://maps.googleapis.com/maps/api/geocode/json?address=' + m.Address + " Ontario, Canada " + '&key=AIzaSyCBflXrPRKWmeB2Le3LiGcUovAMljbtcQI');
            setTimeout(function () {
                $.ajax(query, {
                    dataType: 'json',
                    success: function (gdata) {
                        //ASSIGN THE LOCATION VALUE TO THE MARKER OBJECT
                        m.LatLong = gdata.results[0].geometry.location;
                        //PLACE MARKER ON MAP
                        var markerPin = new google.maps.Marker({
                            'title': 'Cool place to be',
                            'position': m.LatLong,
                            'map': map,
                        });
                        // counter++;
                        // console.log("counter: " + counter);
                    }
                });
            }, 275); //SET A TIMEOUT TO MANAGE THE REQUESTS TO THE GEOCODE SERVICE
        };
        //GO THROUGH EACH MARKER AND GET THE COORDINATES
        for (var _i = 0, mapMarkers_1 = mapMarkers; _i < mapMarkers_1.length; _i++) {
            var m = mapMarkers_1[_i];
            _loop_1(m);
        } //end of For Loop
    }
});
