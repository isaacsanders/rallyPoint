Util = new function() {
  var self = this;

  Meteor.methods({
    log: consoleLog
  });


  function consoleLog() {
    console.log.apply(console, arguments);
  }

  self.wrapMeteorMethod = function() {
    var methodArgs = _.toArray(arguments);
    return function() {
      var execArgs = methodArgs.concat(_.toArray(arguments));
      Meteor.call.apply(Meteor, execArgs);
    }
  };

  self.log = self.wrapMeteorMethod('log');

  self.locToMongo = function(location) {
    return {type: 'Point', coordinates: [location.latitude, location.longitude]};
  };


  self.distance = function(lat1, lon1, lat2, lon2) {
    var rad      = Math.PI / 180,
        radlat1  = rad * lat1,
        radlat2  = rad * lat2,
        radlon1  = rad * lon1,
        radlon2  = rad * lon2,
        theta    = lon1 - lon2,
        radtheta = rad * theta,
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist) * 180/Math.PI;
    return dist * 60 * 1.1515 // to miles
}


  //=================== CLIENT ONLY ==================
  if (Meteor.isClient) {

    self.getLatLng = function() {
        var loc = Session.get('location');
        return loc && { lat: loc.latitude, lng: loc.longitude };
    }
  }
  //==================================================
}
