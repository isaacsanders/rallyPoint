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
  setGroupRallyState(groupId, true);
}

function stopRally(groupId) {
  setGroupRallyState(groupId, false);
}



 // function startRally() {
    // var currentUser = Meteor.user;
    // var group = Groups.findOne();
    // var users = Meteor.users.find({
    //   _id: {
    //     $in: group.userIds,
    //     $ne: currentUser._id
    //   }
    // });
  //   users.forEach(function(user) {
  //     Push.send({
  //       from: currentUser.profile.name,
  //       title: "Rally!",
  //       text: "Time to meet up with your group.",
  //       query: {
  //         userId: user._id
  //       },
  //       token: {
  //         apn: "com.idujdf3kb2ankea9utre"
  //       }
  //     });
  //   });
  // }