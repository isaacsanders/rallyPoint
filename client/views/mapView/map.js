if(Meteor.isClient){
	Template.map.rendered= function(){
		GoogleMaps.load();	
	};

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
	  // We can use the `ready` callback to interact with the map API once the map is ready.
	  GoogleMaps.ready('exampleMap', function(gmap) {
	  		
	  		//TODO: meteor on location changed
	  		//zoomUsers(Meteor.users.find());  <-approximately
	  		
	  		window.setInterval(function(){
	  			var centerPoint= panCurrentLocation(gmap);
	  			updateMarkers(gmap, centerPoint);
	  			
	  		}, 1000);	    
	  });	  
	};	
}

var panCurrentLocation = function(myMap){	
	// console.log("finding location");

	var bounds = new google.maps.LatLngBounds();	
	
	for(var j=0; j<latLngArr.length; j++){
		bounds.extend(latLngArr[j]);
	}	
	myMap.instance.fitBounds(bounds);
	return bounds.getCenter();
}

var updateMarkers= function(mymap, centerPoint){
	var users= Meteor.users.find();
	users.forEach(function(user){
		var gLatLng= new google.maps.LatLng(user.location.latitude, user.location.longitude);
		var marker = new google.maps.Marker({
			    position: gLatLng,
			    map: myMap.instance,
			    title: user.name
				});
	});	
	var marker = new google.maps.Marker({
			    position: centerPoint,
			    map: myMap.instance,
			    title: "Rally Point"
				});
}
