Meteor.publish('usersSyncingNearLoc', function(location) {
    if (!location.accuracy) return;
    
    var query = 
    { 
        'profile.location': { $nearSphere: { 
            $geometry:    Util.locToMongo(location),
            $maxDistance: 50 + location.accuracy
        }},
        'profile.isSyncing': true
    };
    return Meteor.users.find(query);
});


Meteor.publish('group', function(groupId) {
    check(groupId, String);
    return [ Groups.find({ _id: groupId }),
             Meteor.users.find({ 'profile.groupId': groupId }) ]
});