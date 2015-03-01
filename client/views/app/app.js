var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

rallypt.currentScreen = rallypt.ScreenEnum.MAP;

Template.app.helpers({

    toggleIcon: function () {
      if(rallypt.currentScreen == rallypt.ScreenEnum.COMPASS) {       
          return "fa fa-street-view";
      }else if(rallypt.currentScreen == rallypt.ScreenEnum.MAP) { 
          return "fa fa-compass";
      }else{
          return "fa fa-user-plus";
      }
    },

    rallyText: function (){
      if(rallypt.currentScreen == rallypt.ScreenEnum.COMPASS){
        return "Rally";
      }else{
        return "Stop Rally";
      }
    },

    currentScreen: function(currentInt){
      return currentInt == rallypt.currentScreen;
    }
  });


Template.app.events({

  "click #toggle": function (event, template) {
    if(rallypt.currentScreen== rallypt.ScreenEnum.COMPASS){
      rallypt.currentScreen= rallypt.ScreenEnum.MAP;
    }else{
      rallypt.currentScreen= rallypt.ScreenEnum.COMPASS;
    }
  },
  
  "click #leave": function (event, template) {
    Meteor.call("leaveGroup", Meteor.userId());
  }
});