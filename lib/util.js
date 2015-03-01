Util = new function() {
  var self = this;

  Meteor.methods({
    log: consoleLog,
    rallyGroup: rallyGroup
  });

  function rallyGroup() {
    var currentUser = Meteor.user;
    Util.log(currentUser);
    var group = Groups.findOne();
    var users = Meteor.users.find({
      _id: {
        $in: group.userIds,
        $ne: currentUser._id
      }
    });
    users.forEach(function(user) {
      Push.send({
        from: currentUser.profile.name,
        title: "Rally!",
        text: "Time to meet up with your group.",
        query: {
          userId: user._id
        },
        token: {
          apn: "com.idujdf3kb2ankea9utre"
        }
      });
    });
  }

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
