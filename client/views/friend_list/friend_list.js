if (Meteor.isClient) {
	// This only runs on client
	Template.friendList.helpers({
		friends: function () {
			return Meteor.users.find({});
		}
	});

}