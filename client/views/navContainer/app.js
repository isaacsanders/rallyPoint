var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

rallypt.currentScreen= rallypt.ScreenEnum.COMPASS;


Template.app.helpers({
    toggleIcon: function () {
      if(currentScreen == rallypt.ScreenEnum.COMPASS){//in compass view        
        return "fa fa-compass";
      }else if(currentScreen == rallypt.ScreenEnum.MAP){// map view
        return "fa fa-street-view";
      }else{//friend view (add button)
        return "fa fa-plus";
      }
    },
    rallyText: function (){
      if(currentScreen == rallypt.ScreenEnum.COMPASS){
        return "Rally!";
      }else{
        return "Stop Rally!";
      }
    },
    currentScreen: function(currentInt){
      return currentInt == currentScreen;
    }
  });