Groups = new Meteor.Collection('groups');

Meteor.methods({
  startRally: startRally,
  stopRally: stopRally
});

function setGroupRallyState(groupId, isRallying) {
  check(groupId, String);
  check(isRallying, Boolean);
  Groups.update(groupId, { isRallying: isRallying });
}

function startRally(groupId) {
  var currentUser = Meteor.user();
  var group = Groups.findOne({ _id: groupId });
  var users = Meteor.users.find({
    _id: { $ne: currentUser._id },
    "profile.groupId": group._id
  });
  Push.debug = true;
  users.forEach(function(user) {
    Util.log("pushing");
    var push = Push.send({
      from: "Test",
      title: "Rally!",
      text: "Time to meet up with your group.",
      query: {
        userId: user._id
      }
    });
    Util.log(push);
  });
  setGroupRallyState(groupId, true);
}

function stopRally(groupId) {
  setGroupRallyState(groupId, false);
}
