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
	  			panCurrentLocation(gmap);
	  			// updateMarkers(gmap);
	  		}, 1000);	    
	  });	  
	};	
}

var panCurrentLocation = function(myMap){	
	// console.log("finding location");

	var bounds = new google.maps.LatLngBounds();
	
	// //start dummy code
	var latLngArr= [];
	for(var i=1; i<=10; i++){
		latLngArr[i-1]= new google.maps.LatLng(37+(i/1000), 35-(i/1000));
	}
	// //end dummy code
	
	for(var j=0; j<latLngArr.length; j++){
		bounds.extend(latLngArr[j]);
	}	
	myMap.instance.fitBounds(bounds);

	// if(navigator.geolocation) {
	//     	navigator.geolocation.getCurrentPosition(function(position) {
	// 		    var pos = new google.maps.LatLng(position.coords.latitude,
	// 		                                       position.coords.longitude);
	// 		    myMap.instance.setCenter(pos);
	// 		    }, function() {
	// 		      handleNoGeolocation(true);
	// 		    });
 //  		}
}

var zoomUsers = function(users){

	users.forEach(function(user){
		//is most northeast
		//is most 
	});
}
