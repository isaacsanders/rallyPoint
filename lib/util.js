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
    return {type: 'Point', coordinates: [location.coords.latitude, location.coords.longitude]};
  }


  //=================== CLIENT ONLY ==================
  if (Meteor.isClient) {

    self.getLatLng = function() {
        var loc = Session.get('location');
        return loc && { lat: loc.coords.latitude, lng: loc.coords.longitude };
    }
  }
  //==================================================
}