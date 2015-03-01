Template.friendList.helpers({
		friends: function () {
			return Meteor.users.find({});
		}
});


Template.friend.helpers({
    distance: function() {
        var thierCoords = this.profile.location.coordinates;
        var myCoords    = Meteor.user().profile.location.coordinates;
        return Util.distance(thierCoords[0], thierCoords[1], myCoords[0], myCoords[1]).toFixed(2) + ' mi';
    }
});