var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

var currentScreen = new ReactiveVar(rallypt.ScreenEnum.FRIENDS, null);

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
    friendVisible:function(){
      if(currentScreen.get()==rallypt.ScreenEnum.FRIENDS){
        console.log("showing friendVisible");
        return true;        
      }
      console.log("hiding invisible friends");
      return false;
    },

    compassVisible: function(currentInt) {
      if(currentScreen.get()== currentInt){
        // console.log()
        return "visible";        
      }else{        
        return "hidden";
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
  },
  
  "click #leave": function (event, template) {
    Meteor.call("leaveGroup", Meteor.userId());
  }
});