$(document).ready(startWatchingPosition);

// options for watchPosition
var options = { enableHighAccuracy: true, timeout: 10000000, maximumAge: 0 };

function onError(newError) {
  Session.set('locationError', newError);
}

function onPosition(newLocation) {
  var coords = newLocation.coords;
  if (!coords) return;
  Session.set('location',  { accuracy: coords.accuracy, latitude: coords.latitude, longitude: coords.longitude });
}

function startWatchingPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(onPosition, onError, options);
  }
}
