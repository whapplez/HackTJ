"use strict"

var map
var markers = []
var markersOn = true;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.8960952, lng: -77.1333157},
    zoom: 11,
	styles: [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}]
  });

  google.maps.event.addListener(map,'idle',function(){
    if(!this.get('dragging') && this.get('oldCenter') && this.get('oldCenter')!==this.getCenter()) {
      deleteMarkers()
      updateAtmLocation()
      // center
      var lat = map.getCenter().lat()
      var lng = map.getCenter().lng()
    }
    if(!this.get('dragging')){
     this.set('oldCenter',this.getCenter())
    }
  });

  google.maps.event.addListener(map,'dragstart',function(){
    this.set('dragging',true);          
  });

  google.maps.event.addListener(map,'dragend',function(){
    this.set('dragging',false);
    google.maps.event.trigger(this,'idle',{});
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
