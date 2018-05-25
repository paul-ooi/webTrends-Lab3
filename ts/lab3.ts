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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 12
    });

}


