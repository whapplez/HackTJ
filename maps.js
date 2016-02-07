"use strict"

var map
var markers = []
var markersOn = true;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.8992651, lng: -77.1773},
    zoom: 12
  });
}

function drawAtmMarker(lat, lng, markerTitle, markerContent) {
  var infowindow = new google.maps.InfoWindow({
    content: markerContent
  });

  var marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
    title: markerTitle
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function toggle(){
	if(!markersOn){
		showMarkers();
	}
	else{
		clearMarkers();
	}
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markersOn = false;
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
  markersOn = true;
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  markersOn = false;
}
