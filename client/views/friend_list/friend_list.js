if (Meteor.isClient) {
	// This only runs on client
	Template.friendList.helpers({
		friendsList: function () {
			return Meteor.users.find({});
		}
		// friends: [
		// 	{ profile: { name: "John" }},
		// 	{ profile: { name: "Seth" }},
		// 	{ profile: { name: "Isaac" }},
		// 	{ profile: { name: "Mark" }}
		// ]
	});
}