// Accounts.config({
//   sendVerificationEmail: false,
//   loginExpirationInDays: null
// });

// if (Meteor.isServer) {
//   Meteor.methods({
//     createTempUser: createTempUser,
//   });
// }

// Meteor.methods({
//   setUserProfileProperty: setUserProfileProperty
// });


// function createTempUser(name) {
//   var randString  = Random.secret(25);
//       credentials = { email: randString, password: randString },
//       userFields  = _.extend(credentials, );
//   Accounts.createUser(userFields);
//   return credentials;
// }

// function setUserProfileProperty(userId, propName, propVal) {
//   check(userId,   String);
//   check(propName, String);

//   var property = {};
//   property['profile.' + propName] = propVal;
//   Meteor.users.update({ _id: userId }, { $set: property });
// }

// function uniqueEmail() {
//   var username = 
//   while (usernameExists)
// }

// function usernameExists(username) {
//   return !! Meteor.users.findOne({ username: username });
// }