Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { name: 'home' });

Router.route('/map', { name: 'map' });
Router.route('/compass', { name: 'compass' });
Router.route('/friend_list', { name: 'friendList'});