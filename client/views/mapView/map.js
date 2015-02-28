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
	  		
	  		window.setInterval(function(){
	  			var centerPoint = panCurrentLocation(gmap);
	  			updateMarkers(gmap, centerPoint);	  				  		
	  		}, 5000);	    
	  });	  
	};	
}

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
	return bounds.getCenter();
}

var updateMarkers= function(myMap, centerPoint){
	var users= Meteor.users.find();
	var loc;
	users.forEach(function(user){
		loc = user.profile.location.coordinates;
		var gLatLng= new google.maps.LatLng(loc[0], loc[1]);
		if(Meteor.user()==user){
			var marker = new google.maps.Marker({
				    position: gLatLng,
				    map: myMap.instance,
				    title: "You are here"
					});
		}else{
			var marker = new google.maps.Marker({
				    position: gLatLng,
				    map: myMap.instance,
				    title: user.name
					});
		}
	});	
	var marker = new google.maps.Marker({
			    position: centerPoint,
			    map: myMap.instance,
			    title: "Rally Point"
				});
}
