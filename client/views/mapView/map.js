if(Meteor.isClient){
	Template.map.rendered= function(){
		GoogleMaps.load();	
		// for(var i=1;i<=10;i++){
		// 	createGroupUser("name"+i);
		// 	Meteor.users.update({
		// 		name: {$regex: /name'/+i'/'}
		// 		}, {
  // 					$set: {profile.location.coordinates: [34.1*(i/100), 80*(i/100)]}
		// 		});
		// }
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
	  		var centerPoint = panCurrentLocation(gmap);
	  		updateMarkers(gmap, centerPoint);	  				  		
	  		
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

var markers = [];
var clearMarkers= function(){
	for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

var updateMarkers= function(myMap, centerPoint){
	clearMarkers();	
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
    var i=0;
	users.forEach(function(user){
		loc = user.profile.location.coordinates;
		var gLatLng= new google.maps.LatLng(loc[0], loc[1]);
		populationOptions.center= gLatLng;
		var tempUser= Meteor.user();
		if(tempUser._id == user._id){
			populationOptions.fillColor = "Blue";
		}

    	// Add the circle for this city to the map.    	
    	var circle = new google.maps.Circle(populationOptions);
    	markers[i++]= circle;
    });
    var gLatLng= new google.maps.LatLng(centerPoint); 
    populationOptions.fillColor= 'Green';
	populationOptions.center= gLatLng;   
    var circle = new google.maps.Circle(populationOptions);
    markers[i++] = circle;
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

