Accounts.config({
    sendVerificationEmail: false,
    loginExpirationInDays: null
});

if (Meteor.isServer) {
    Meteor.users._ensureIndex({ "profile.location":'2dsphere'});
    Meteor.methods({
        createTempUser: createTempUser,
    });
}

Meteor.methods({
    setUserProfileProperty: setUserProfileProperty
});


function createTempUser(name) {
    var uniqueEmail  = getUniqueEmail();
        credentials  = { email: uniqueEmail, username: uniqueEmail, password: uniqueEmail },
        userFields   = _.extend(credentials, { profile: { name: name,  location: null}});
    Accounts.createUser(userFields);
    return credentials;
}

function setUserProfileProperty(userId, propName, propVal) {
    check(userId,   String);
    check(propName, String);

    var property = {};
    property['profile.' + propName] = propVal;
    Meteor.users.update({ _id: userId }, { $set: property });
}

function getUniqueEmail() {
    var username = Random.secret(25);
    while (usernameExists(username)) username += Random.secret(10);
    return username;
}

function usernameExists(username) {
    return !! Meteor.users.findOne({ username: username });
}

function locToMongo(location){
    return {type: 'Point', coordinates: [location.long, location.lat]};
}