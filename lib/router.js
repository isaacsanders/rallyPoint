Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route('/', { name: 'home' });