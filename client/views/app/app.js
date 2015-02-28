var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

rallypt.currentScreen = rallypt.ScreenEnum.MAP;

Template.app.helpers({
    toggleIcon: function () {
      if(rallypt.currentScreen == rallypt.ScreenEnum.COMPASS){//in compass view        
        return "fa fa-compass";
      }else if(rallypt.currentScreen == rallypt.ScreenEnum.MAP){// map view
        return "fa fa-street-view";
      }else{//friend view (add button)
        return "fa fa-plus";
      }
    },
    rallyText: function (){
      if(rallypt.currentScreen == rallypt.ScreenEnum.COMPASS){
        return "Rally!";
      }else{
        return "Stop Rally!";
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
    console.log(rallypt.currentScreen);
  }
});