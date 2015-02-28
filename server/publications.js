Meteor.publish('usersSyncingNearLoc', function(location) {
    check
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