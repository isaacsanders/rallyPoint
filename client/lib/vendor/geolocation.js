Meteor.startup(function() {
    if (Meteor.isCordova) {
       document.addEventListener('deviceready', startWatchingPosition, false);
    } else {
      $(document).ready(startWatchingPosition);
    }
});


function onError(newError) {
  Session.set('locationError', newError);
}

function onPosition(newLocation) {
  var coords = newLocation.coords;
  if (!coords) return;
  Session.set('location',  { accuracy: coords.accuracy, latitude: coords.latitude, longitude: coords.longitude });
}

function startWatchingPosition() {
  // options for watchPosition
  var options = { enableHighAccuracy: true, timeout: 10000000, maximumAge: 0 };
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(onPosition, onError, options);
  }
}
