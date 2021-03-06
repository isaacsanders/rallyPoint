Template.map.helpers({
  	exampleMapOptions: function() {
	    // Make sure the maps API has loaded
	    if (GoogleMaps.loaded()) {
	      // Map initialization options
	      return {		        
	        center: new google.maps.LatLng(-37.8136, 144.9631),
	        zoom: 8
	      };
	    }
	  }
});

Template.map.created = function() {
	if (!GoogleMaps.loaded()) GoogleMaps.load();
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(gmap) {	  			  	
  		var centerPoint = panCurrentLocation(gmap);
  		updateMarkers(gmap, centerPoint);	  				  		
  		var centerPoint;
  		window.setInterval(function(){
  			centerPoint = panCurrentLocation(gmap);
  			updateMarkers(gmap, centerPoint);	  				  		
  		}, 5000);	    
  });	  
};	

var panCurrentLocation = function(myMap){		
  var users= Meteor.users.find();
  var bounds = new google.maps.LatLngBounds();	
  var loc;
  users.forEach(function(user){
  	loc = user.profile.location.coordinates;
  	var gLatLng= new google.maps.LatLng(loc[0], loc[1]);
  	bounds.extend(gLatLng);
  })	
  	
  myMap.instance.fitBounds(bounds);	
  // myMap.instance.setZoom(myMap.instance.getZoom()+1);   

  return bounds.getCenter();
}

markers = [];
var clearMarkers= function(){
for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
  }
}

var updateMarkers= function(myMap, centerPoint){	
  var users= Meteor.users.find();
  var loc;
  var populationOptions = {
      strokeColor: 'White',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: 'Red',
      fillOpacity: 1,
      map: myMap.instance,      
      radius: 3
    };

  clearMarkers();	
  
  var flagLoc= new google.maps.LatLng(centerPoint.k, centerPoint.D);
  markers[0] = new google.maps.Marker({
    position: flagLoc,
    scaledSize: new google.maps.Size(150, 150),
    map: myMap.instance,    
    icon: '../images/AppIcon_circle2.png'
  });   

  var i=1;
  var gLatLng, tempUser;  
  users.forEach(function(user){
  	loc = user.profile.location.coordinates;
  	gLatLng= new google.maps.LatLng(loc[0], loc[1]);
    console.log(gLatLng);
  	populationOptions.center= gLatLng;
  	tempUser= Meteor.user();
  	if(tempUser._id == user._id){
  		populationOptions.fillColor = "Red";  		
      // Add the circle for this city to the map.     
      console.log("drawing "+ populationOptions.fillColor+" dot at "+ populationOptions.center);
      markers[i++] = new google.maps.Circle(populationOptions);   
    	}else{
    // Add the circle for this city to the map.     
      populationOptions.fillColor= '#286f7e';
      console.log("drawing "+ populationOptions.fillColor+" dot at "+ populationOptions.center);
      markers[i++] = new google.maps.Circle(populationOptions);     
    }
  });  
}
