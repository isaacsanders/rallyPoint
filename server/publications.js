Meteor.publish('usersSyncingNearLoc', function(location) {
    var query = 
    { 
        'profile.location': { $nearSphere: { 
            $geometry:    Util.locToMongo(location),
            $maxDistance: 50 + location.coords.accuracy
        }},
        'profile.isSyncing': true
    };
    return Meteor.users.find(query);
});


Meteor.publish('group', function(groupId) {
    check(groupId, String);
    return [ Groups.find({ _id: groupId }),
             Meteor.users.find({ groupId: groupId }) ]
});