App.info({
  id: 'com.meteor.rallypoint',
  name: 'rallyPoint',
  description: 'Gather. Explore. Rally.',
  author: 'John T McCormmack, Seth "Ruji" Rujiraviriyapinyo, Isaac Sanders, and Mark Van Aken',
  email: '-',
  website: 'http://rallypoint.meteor.com'
});

App.icons({
  iphone: "public/images/AppIcon.png",
  iphone_2x: "public/images/AppIcon@2.png",
  iphone_3x: "public/images/AppIcon@3.png"
});

App.launchScreens({
  iphone_2x: "public/images/LaunchScreen.png",
  iphone5: "public/images/LaunchScreen-iPhone5.png",
  images6p_portrait: "public/images/LaunchScreen-iPhone6p-Portrait.png"
});

App.setPreference('StatusBarOverlaysWebView', false);
App.setPreference('StatusBarBackgroundColor', '#194650');

