var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

var currentScreen = new ReactiveVar(rallypt.ScreenEnum.MAP, null);

Template.app.helpers({
    toggleIcon: function () {
      if(currentScreen.get() == rallypt.ScreenEnum.COMPASS){//in compass view        
        return "fa fa-compass";
      }else if(currentScreen.get() == rallypt.ScreenEnum.MAP){// map view
        return "fa fa-street-view";
      }else{//friend view (add button)
        return "fa fa-plus";
      }
    },
    rallyText: function (){
      if(currentScreen.get() == rallypt.ScreenEnum.COMPASS){
        return "Rally!";
      }else{
        return "Stop Rally!";
      }
    },
    currentScreenVisible: function(currentInt){
      console.log("currInt "+ currentInt + "rlycur "+currentScreen.get());
      if(currentInt == currentScreen.get()){        
        return "hidden";
      }else{
        return "visible";
      }
    }
  });

Template.app.events({
  "click #toggle": function (event, template) {
    if(currentScreen.get()== rallypt.ScreenEnum.COMPASS){
      currentScreen.set(rallypt.ScreenEnum.MAP);
    }else{
      currentScreen.set(rallypt.ScreenEnum.COMPASS);
    }
    console.log(currentScreen.get());
  }
});