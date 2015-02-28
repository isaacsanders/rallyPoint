Accounts.config({
    sendVerificationEmail: false,
    loginExpirationInDays: null
});

if (Meteor.isServer) {
    Meteor.users._ensureIndex({ groupId: 1 });
    Meteor.users._ensureIndex({ "profile.location":'2dsphere'});
    Meteor.methods({
        createGroupUser: createGroupUser,
        addUsersToGroup: addUsersToGroup
    });
}

Meteor.methods({
    setUserProfileProperty: setUserProfileProperty,
    updateUserLocation:     updateUserLocation,
    startSync:              startSync,
    endSync:                endSync
});


function createGroupUser(name) {
    var uniqueEmail  = getUniqueEmail();
        credentials  = { email: uniqueEmail, username: uniqueEmail, password: uniqueEmail },
        userFields   = _.extend(credentials, { profile: { name: name }});
    Accounts.createUser(userFields);
    return credentials;
}

function updateUserLocation(location) {
    var userId = Meteor.userId();
    if (userId && location) {
        setUserProfileProperty(Meteor.userId(), 'location', Util.locToMongo(location));
    }
}

function startSync(userId) {
    changeSyncState(userId, true);
}

function endSync(userId) {
    changeSyncState(userId, false);
}

function changeSyncState(userId, isSyncing) {
    var time   = isSyncing && Date.now();
    var userId = userId || Meteor.userId();
    Meteor.users.update(userId, { $set: { 'profile.isSyncing': isSyncing, 'profile.syncStartedAt': time } });
}

function addUsersToGroup(userIds, groupId) {
    if (!groupId) {
        groupId = Groups.insert({ userIds: userIds });
    } else {
        Groups.update(groupId, { $addToSet: { userIds: { $each: userIds } } });
    }

    _.each(userIds, function(userId) {
        setUserProfileProperty(userId, 'groupId', groupId);
        endSync(userId);
    });
}

function setUserProfileProperty(userId, propName, propVal) {
    check(userId,   String);
    check(propName, String);

    var property = {};
    property['profile.' + propName] = propVal;
    Meteor.users.update(userId, { $set: property });
}

function getUniqueEmail() {
    var username = Random.secret(25);
    while (usernameExists(username)) username += Random.secret(10);
    return username;
}

function usernameExists(username) {
    return !! Meteor.users.findOne({ username: username });
}