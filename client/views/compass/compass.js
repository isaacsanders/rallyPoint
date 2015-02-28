Template.compass.helpers({
  distToRP: 10.0,
  heading: 0.0
});

Template.compass.events({
  "click .start-watch": function(event, template) {
    var self = template;

    var button = template.$(".start-watch");
    button.toggleClass("start-watch");
    button.toggleClass("stop-watch");
    button.text("Stop Watching");

    var $compass = self.$(".compass");
    var $heading = self.$(".heading-value");

    var success = function(data) {
      var heading = data.magneticHeading;
      var adjustment = self.heading - heading

      $heading.text(heading +" + "+ data.headingAccuracy);
      $compass.velocity({
        rotateZ: -heading
      }, {
        duration: 1,
        easing: [50, 20]
      });

      self.heading = adjustment

    }, failure = function() {
      Meteor.call("log", ["failure", arguments]);
    };

    Meteor.startup(function() {
      self.watchId = navigator.compass.watchHeading(success, failure, {
      });
    });
  },
  "click .stop-watch": function(event, template) {
    var self = template;

    var button = template.$(".stop-watch");
    button.toggleClass("start-watch");
    button.toggleClass("stop-watch");
    button.text("Start Watching");

    Meteor.startup(function() {
      navigator.compass.clearWatch(template.watchId);
      self.watchId = null;
    });
  }
});

Template.compass.rendered = function() {
  var self = this;
  var $compass = self.$(".compass");
  var $heading = self.$(".heading-value");
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
  }
};
