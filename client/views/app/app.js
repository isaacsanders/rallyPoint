var self,
    renderFriendsList = new ReactiveVar(false),
    renderCompass     = new ReactiveVar(false),
    paneText          = new ReactiveVar(''),
    toggleIconClass   = new ReactiveVar(''),
    rallyText         = new ReactiveVar('');

Template.app.created = function() {
    self = this;
};

Template.app.rendered = function() {
    self.addUsersModal = self.$('#add-users');
    self.addUsersModal.on('hidden.bs.modal', stopSyncing);
    self.paneToggle = self.$('#toggle');
    self.autorun(updateCurrentPaneParams);
    self.autorun(updateRallyState);
};

Template.app.helpers({
    renderFriendsList: function() { return renderFriendsList.get() },
    renderCompass:     function() { return renderCompass.get()     },
    paneText:          function() { return paneText.get()          },
    toggleIconClass:   function() { return toggleIconClass.get()   },
    rallyText:         function() { return rallyText.get()         }
});    
   

Template.app.events({

    'click .fa-street-view': function() { 
        renderFriendsList.set(false);
        renderCompass.set(false);
     },

     'click .fa-compass': function() {
        renderFriendsList.set(false);
        renderCompass.set(true);
     },

    'click #leave': leaveGroup,

    'click .fa-user-plus': startSyncing,

    'click #add-users .stop': stopSyncing,

    'click footer': toggleRallyState
});

function updateCurrentPaneParams() {
    if (renderFriendsList.get()) {
        paneText.set('Group Members');
        toggleIconClass.set('fa-user-plus');
    } else if (renderCompass.get()) {
        paneText.set('Compass View');
        toggleIconClass.set('fa-street-view');
    } else {
        paneText.set('Street View');
        toggleIconClass.set('fa-compass');
    }
}


function leaveGroup() {
    Meteor.call('leaveGroup', Meteor.userId());
}

function startSyncing() {
    self.addUsersModal.modal('show');
    Meteor.call('startSync');
}

function stopSyncing() {
    self.addUsersModal.modal('hide');
    Meteor.call('endSync');
}

function toggleRallyState() {
    var group = Groups.findOne();
    group.isRallying ? Meteor.call('stopRally', group._id) : Meteor.call('startRally', group._id);
}

function updateRallyState() {
    if (Groups.findOne().isRallying) {
        rallyText.set('Stop Rally');
        renderFriendsList.set(false);
        renderCompass.set(Meteor.isCordova);
        !Meteor.isCordova && self.paneToggle.hide();
    } else {
        rallyText.set('Start Rally');
        renderFriendsList.set(true);
        renderCompass.set(false);
        self.paneToggle.show();
    }
}
