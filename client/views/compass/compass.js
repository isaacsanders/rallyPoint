Template.compass.helpers({
  distToRP: 0.0,
  heading: 0.0
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
  var $heading = self.$(".heading-value");
  var $distance = self.$(".distance-value");
  if (Meteor.isCordova) {
    var failure = function() {
      Meteor.call("log", ["failure", arguments]);
    };
    Meteor.startup(function() {
      navigator.compass.getCurrentHeading(function(data) {
        var heading = Math.floor(data.magneticHeading);
        $heading.text(heading);
        self.heading = heading;
      }, failure);
    });

    GoogleMaps.load();
    self.interval = setInterval(function() {
      if (GoogleMaps.loaded()) {
        var ll = Util.getLatLng();
        var myLocation = new google.maps.LatLng(ll.lat, ll.lng);

        var currentUser = Meteor.user;
        var group = Groups.findOne();
        var users = Meteor.users.find({ _id: { $in: group.userIds, $ne: currentUser._id } });
        var bounds = new google.maps.LatLngBounds();
        users.forEach(function(user) {
          var LatLng = new google.maps.LatLng(user.profile.location.latitude, user.profile.location.longitude);
          bounds.extend(latLng);
        });

        var center = bounds.getCenter();
        var distance = google.maps.geometry.spherical.computeDistanceBetween(myLocation, center);
        var heading = google.maps.geometry.spherical.computeHeading(myLocation, center) + 180;
        var adjustment = self.heading - heading

        $heading.text(heading);
        $heading.text(distance);
        $compass.velocity({
          rotateZ: -heading
        }, {
          duration: 1,
          easing: [50, 20]
        });

        self.heading = adjustment;
      }
    }, 1000*5);
  }
};
