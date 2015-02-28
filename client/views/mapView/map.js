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
	var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      map: myMap.instance,      
      radius: 3
    };
	users.forEach(function(user){
		loc = user.profile.location.coordinates;
		var gLatLng= new google.maps.LatLng(loc[0], loc[1]);
		populationOptions.center= gLatLng;
		if(Meteor.user()==user){
			populationOptions.fillColor = "#FFFF00";
		}

    	// Add the circle for this city to the map.
    	var circle = new google.maps.Circle(populationOptions);
    });
    var gLatLng= new google.maps.LatLng(centerPoint); 
    populationOptions.fillColor= '#33FF33';
	populationOptions.center= gLatLng;   
    var circle = new google.maps.Circle(populationOptions);
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

