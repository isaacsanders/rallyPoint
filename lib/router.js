Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { name: 'home' });

Router.route('/map', { name: 'map' });
Router.route('/compass', { name: 'compass' });

// =================== Accounts Hook ========================
Router.onBeforeAction(ensureUserAccount);
function ensureUserAccount() {
    var self = this;
    if (!Meteor.user()) {
        Meteor.call('createTempUser', function(error, user) {
            console.log('HERE', error, user);
            Meteor.loginWithPassword(user.email, user.password);
        });
        this.render('loading');
    } else {
        self.next();
    }
}
// ==========================================================