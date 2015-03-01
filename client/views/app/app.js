var rallypt={};
rallypt.ScreenEnum = {
    FRIENDS : 0,
    COMPASS : 1,
    MAP : 2,
};

var currentScreen = new ReactiveVar(rallypt.ScreenEnum.FRIENDS, null);

Template.app.helpers({
    toggleIcon: function () {
      if(currentScreen.get() == rallypt.ScreenEnum.MAP){//in compass view        
        return "fa fa-compass";
      }else if(currentScreen.get() == rallypt.ScreenEnum.COMPASS){// map view
        return "fa fa-street-view";
      }else{//friend view (add button)
        return "fa fa-user-plus";
      }
    },
    rallyText: function (){
      if(currentScreen.get() == rallypt.ScreenEnum.FRIENDS){
        return "Rally!";
      }else{
        return "Stop Rally!";
      }
    },    
    friendVisible:function(){
      if(currentScreen.get()==rallypt.ScreenEnum.FRIENDS){        
        return true;        
      }      
      return false;
    },
    compassVisible: function(currentInt){
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
    }else if(currentScreen.get()== rallypt.ScreenEnum.MAP){
      currentScreen.set(rallypt.ScreenEnum.COMPASS);
    }else{
      alert("find more friends");
    }
  },
  "click #leave": function (event, template) {
    Meteor.call("leaveGroup", Meteor.userId());
  }
});