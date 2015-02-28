Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  onRun: ensureUser,
  onAfterAction: ensureLocation
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { 
    name: 'home',

    onBeforeAction: function() {
        var groupId = Meteor.user().profile.groupId;
        if (groupId) {
            Router.go('app', { groupId: groupId });
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
    Util.log('CHECK FOR USER');
    if (Meteor.user()) {
        Util.log('USER FOUND');
        this.next();
    } else {
        Util.log('NO USER USER');
        Meteor.call('createGroupUser', function(error, user) {
            Util.log('CREATE USER');
            Meteor.loginWithPassword(user.email, user.password);
            Util.log('DONE CREATING USER');
        });
        this.render('loading');
    }
}

function ensureLocation() {
    var loc = Session.get('location');
    Meteor.call('updateUserLocation', loc);
}
