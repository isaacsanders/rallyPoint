Template.compass.helpers({
  distToRP: 0.0,
});

Template.compass.events({
  "click #toggle": function(event, template) {
    if (template.interval) {
      clearInterval(template.interval);
    }
  }
})

Template.compass.rendered = function() {
  var self = Template.instance();
  var $compass = self.$(".compass");
  var $distance = self.$(".distance-value");
  if (Meteor.isCordova) {
    var failure = function() {
      Util.log(["failure", arguments]);
    };
    Meteor.startup(function() {
      navigator.compass.getCurrentHeading(function(data) {
        if (GoogleMaps.loaded()) {
          var ll = Util.getLatLng();
          var myLocation = new google.maps.LatLng(ll.lat, ll.lng);

          var currentUser = Meteor.user();
          var group = Groups.findOne({ _id: currentUser.profile.groupId });
          var users = Meteor.users.find({ "profile.groupId": group._id });
          var bounds = new google.maps.LatLngBounds();
          users.forEach(function(user) {
            var latLng = new google.maps.LatLng(user.profile.location.latitude, user.profile.location.longitude);
            bounds.extend(latLng);
          });

          var center = bounds.getCenter();
          var distance = google.maps.geometry.spherical.computeDistanceBetween(myLocation, center);
          var desiredHeading = google.maps.geometry.spherical.computeHeading(myLocation, center) + 180;
          var heading = Math.floor(data.magneticHeading);
          self.heading = heading - desiredHeading - 180;

          $compass.velocity({
            rotateZ: -self.heading
          }, {
            duration: 1,
            easing: [50, 20]
          });

          $distance.text(distance);
        }
      }, failure);
    });

    Meteor.startup(function() {
      self.watch = navigator.compass.watchHeading(function(data) {
        if (GoogleMaps.loaded()) {
          var ll = Util.getLatLng();
          var myLocation = new google.maps.LatLng(ll.lat, ll.lng);

          var currentUser = Meteor.user();
          var group = Groups.findOne({ _id: currentUser.profile.groupId });
          var users = Meteor.users.find({ "profile.groupId": group._id });
          var bounds = new google.maps.LatLngBounds();
          users.forEach(function(user) {
            var latLng = new google.maps.LatLng(user.profile.location.coordinates[0], user.profile.location.coordinates[1]);
            bounds.extend(latLng);
          });

          var center = bounds.getCenter();
          var distance = google.maps.geometry.spherical.computeDistanceBetween(myLocation, center);
          var desiredHeading = google.maps.geometry.spherical.computeHeading(myLocation, center) + 180;
          var heading = data.magneticHeading
          var adjustment = heading - self.heading

          $compass.velocity({
            rotateZ: -heading
          }, {
            duration: 1,
            easing: [50, 20]
          });

          self.heading = adjustment;
          $distance.text(distance);
        }
      });
    });
  }
};
