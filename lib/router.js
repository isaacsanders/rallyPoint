Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  onBeforeAction: ensureUser,
  onAfterAction: ensureLocation
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { name: 'home' });

Router.route('/app', { name: 'app' });
Router.route('/map', { name: 'map' });
Router.route('/compass', { name: 'compass' });
Router.route('/friend_list', { name: 'friendList'});


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
