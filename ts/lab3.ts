interface LatLng {
    lat : number,
    lng : number
}

//WHEN MAKING A CLASS YOU SHOULD HAVE A CONSTRUCTOR
class MapMarker {
    Address : string;
    LatLong : LatLng;

    public constructor(address:string) {
        this.Address = address;
    }
}

let Toronto : LatLng =
    {
        //Original Coordinates from the lab
        // lat : 43,
        // lng : -79.38
        lat: 43.653226,
        lng: - 79.383184
    };

let map :any;
let mapMarkers : MapMarker[] = [];
let gcode : object;
let counter : number = 0;
let indexCounter : number = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });

    gcode = new google.maps.Geocoder();
    placeMarker();
}//END OF INITMAP


//CALL LOCAL JSON FILE TO GET PARTIAL ADDRESSES
$.ajax(
    'data/ac-public-places.json',
    {
        dataType: 'json',
        success: function (data: any) {
            for (let d of data) {
                //ADD MAP MARKER TO ARRAY OF MAP MARKERS
                let newMapMarker: MapMarker = new MapMarker(d.address);
                mapMarkers.push(newMapMarker);
            }
        }
    }
);

//PLACE MARKER
function placeMarker () : void {
    if (indexCounter < mapMarkers.length) {
        let m = mapMarkers[indexCounter];
        gcode.geocode({ 'address': m.Address + " Toronto, ON" }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                m.LatLong = results[0].geometry.location;
                console.log(status);
                counter++;
                console.log(counter);
                indexCounter++;
                setTimeout(placeMarker, 300);//DELAY THE CALL WHEN SUCCESSFUL TO AVOID REACHING THE LIMIT PER SECOND
            } else {
                console.log(status);
                console.log(m.Address);
                setTimeout(placeMarker, 1600);
            }
        });
                    
    } else {
        for (let m of mapMarkers) {
            let marker = new google.maps.Marker({
                'title': 'Cool place to be',
                'position': m.LatLong,
                'map': map,//SET MARKER ON MAP
            });
        }
    }
}// END OF PLACEMARKER