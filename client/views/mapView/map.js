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
  // console.log(bounds.getCenter());
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
      fillOpacity: 0.3,
      map: myMap.instance,      
      radius: 3
    };

  clearMarkers();	
  
  var flagLoc= new google.maps.LatLng(centerPoint.k, centerPoint.D);   
  populationOptions.fillColor= 'Green';
  populationOptions.center= flagLoc;   
  console.log("drawing "+ populationOptions.fillColor+" dot at "+ populationOptions.center);
  markers[0] = new google.maps.Circle(populationOptions);   

  var i=1;
  var gLatLng, tempUser;
  populationOptions.fillColor= 'Red';
  users.forEach(function(user){
  	loc = user.profile.location.coordinates;
  	gLatLng= new google.maps.LatLng(loc[0], loc[1]);
    console.log(gLatLng);
  	populationOptions.center= gLatLng;
  	tempUser= Meteor.user();
  	if(tempUser._id == user._id){
  		populationOptions.fillColor = "Orange";  		
  	}

  	// Add the circle for this city to the map.    	
    console.log("drawing "+ populationOptions.fillColor+" dot at "+ populationOptions.center);
  	markers[i++] = new google.maps.Circle(populationOptions);  	
  });

   
}
// 	if(Meteor.user()==user){
// 		var marker = new google.maps.Marker({
// 			    position: gLatLng,
// 			    map: myMap.instance,
// 			    title: "You are here"
// 				});
// 	}else{
// 		var marker = new google.maps.Marker({
// 			    position: gLatLng,
// 			    map: myMap.instance,
// 			    title: user.name
// 				});
// 	}
// });	
// var marker = new google.maps.Marker({
// 		    position: centerPoint,
// 		    map: myMap.instance,
// 		    title: "Rally Point"
// 			});

