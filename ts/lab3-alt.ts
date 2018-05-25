interface LatLng {
    lat: number,
    lng: number
}

//WHEN MAKING A CLASS YOU SHOULD HAVE A CONSTRUCTOR
class MapMarker {
    Address: string;
    LatLong: LatLng;

    public constructor(address: string) {
        this.Address = address;
    }
}

let Toronto: LatLng =
    {
        //Original Coordinates from the lab
        // lat : 43,
        // lng : -79.38
        lat: 43.653226,
        lng: - 79.383184
    };

let map: any;
let mapMarkers: MapMarker[] = [];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });

}//END OF INITMAP



//GET ADDRESSES FROM THE JSON
$.ajax (
    'data/ac-public-places.json',
    {
        dataType: 'json',
        success: function(data:any) {
            for (let d of data) {
                // console.log(d);

                //ADD MAP MARKER TO ARRAY OF MAP MARKERS
                let newMapMarker : MapMarker = new MapMarker(d.address);
                mapMarkers.push(newMapMarker);
            }
            console.log(mapMarkers);
        },
        complete: function() {
            //GO THROUGH EACH MARKER AND GET THE COORDINATES
            for (let m of mapMarkers) {
                let query = encodeURI('https://maps.googleapis.com/maps/api/geocode/json?address=' + m.Address + " Ontario, Canada " + '&key=AIzaSyCBflXrPRKWmeB2Le3LiGcUovAMljbtcQI');
                setTimeout(function() {
                    $.ajax(query,
                        {
                            dataType: 'json',
                            success: function(gdata:any) {
                                //ASSIGN THE LOCATION VALUE TO THE MARKER OBJECT
                                m.LatLong = gdata.results[0].geometry.location;
                                
                                //PLACE MARKER ON MAP
                                let markerPin = new google.maps.Marker({
                                    'title': 'Cool place to be',
                                    'position': m.LatLong,
                                    'map': map,//SET MARKER ON MAP
                                });
                                // counter++;
                                // console.log("counter: " + counter);
                            }
                        });
                    },275);//SET A TIMEOUT TO MANAGE THE REQUESTS TO THE GEOCODE SERVICE
            }//end of For Loop
        }
}
);
