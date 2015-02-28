var self,
    FINDING_CLASS = 'finding',
    isLocationOff = false;

Template.home.created = function() {
    self = this;
}

Template.home.rendered = function() {
    self.finder     = self.$('.find-group'),
    self.nameInput  = self.$('.name');
    $('.submit')
        .on('vmousedown', findGroupMemebers)
        .on('vmouseup',   stopFindingGroupMembers);

    self.autorun(checkLocationError);
    self.autorun(subcribeToUsersSyncingNearLoc);
    self.autorun(tryConnectToGroup);
}
 
Template.home.events({
    'mouseup .submit, mouseout .submit': stopFindingGroupMembers
});


function findGroupMemebers(event) {
    event.preventDefault();
    if (isLocationOff) return;
    if (!self.nameInput.val()) return issueNonameInputAlert();
    self.finder.addClass(FINDING_CLASS);
    Meteor.call('setUserProfileProperty', 'name', self.nameInput.val(), function() {
        Meteor.call('startSync');
    });
}

function stopFindingGroupMembers() {
    if (isLocationOff) return;
    self.finder.removeClass(FINDING_CLASS);
    Meteor.call('endSync');
}

function issueNonameInputAlert() {
    if (isLocationOff) return;
    self.finder.addClass('error');
    clearTimeout(self.errorTimer);
    self.errorTimer = setTimeout(function() {
        self.finder.removeClass('error');
    }, 1000);
}

function checkLocationError() {
    if (Session.get('locationError')) {
        self.finder.addClass('location-error');
        isLocationOff = true;
    }
}

function subcribeToUsersSyncingNearLoc() {
    var loc       = Session.get('location'),
        isSyncing = Meteor.user() && Meteor.user().profile.isSyncing;
    if (loc && isSyncing) {
        Meteor.subscribe('usersSyncingNearLoc', loc, function(err) {
        });
    }
}

function tryConnectToGroup() {
    clearTimeout(self.connectTimer);
    var usersSyncing = Meteor.users.find();
    Util.log('TRY CONNECT!!!!!');
    if (usersSyncing.count() > 1) {
        Util.log('SETTING TIMER!!!!!', usersSyncing.fetch());
        self.connectTimer = setTimeout(connect, 2500);
    }

    function connect() {
        var lastUserToSync  = Meteor.user(), 
                    userIds = [],
                    groupId;

        usersSyncing.forEach(function(user) {
            userIds.push(user._id);
            user.groupId && (groupId = user.groupId);
            if (user.syncStartedAt > lastUserToSync.syncStartedAt) lastUserToSync = user;
            Util.log('COMPARE', user.syncStartedAt, lastUserToSync.syncStartedAt, user.syncStartedAt > lastUserToSync.syncStartedAt);
        });

        if (lastUserToSync._id == Meteor.userId()) {
            Meteor.call('addUsersToGroup', userIds, groupId);
        }
    }
}