if (Meteor.isClient) {
	// This only runs on client
	Template.friendList.helpers({
		toggleIcon: function () {
			return Meteor.users.find({});
		}
	});
}