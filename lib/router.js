Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  onBeforeAction: ensureUser,
  onAfterAction: ensureLocation
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { 
    name: 'home',

    onBeforeAction: function() {
        var groupId = Meteor.user() && Meteor.user().profile.groupId;
        if (groupId) {
            this.redirect('app', { groupId: groupId });
        } else {
            this.next();
        }
    }
});

Router.route('/app/:groupId', { 
    name: 'app',

    waitOn: function() {
        return Meteor.subscribe('group', this.params.groupId);
    }
});

function ensureUser() {
    if (Meteor.user()) {
        this.next();
    } else if (Meteor.loggingIn()) {
        this.render('loading');
    } else {
        Meteor.call('createGroupUser', function(error, user) {
            Meteor.loginWithPassword(user.email, user.password);
        });
        this.render('loading');
    }
}

function ensureLocation() {
    var loc = Session.get('location');
    Meteor.call('updateUserLocation', loc);
}
