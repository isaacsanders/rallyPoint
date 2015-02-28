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
        var groupId = Meteor.user().groupId;
        if (groupId) {
            Router.go('app', groupId);
        } else {
            this.next();
        }
    }
});

Router.route('/app/:groupId', { name: 'app' });


function ensureUser() {
    if (Meteor.user()) {
        this.next();
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
