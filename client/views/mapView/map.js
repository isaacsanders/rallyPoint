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
		        zoom: 12
		      };
		    }
		  }
	});
	
	Template.map.created = function() {
	  // We can use the `ready` callback to interact with the map API once the map is ready.
	  GoogleMaps.ready('exampleMap', function(gmap) {
	  		console.log("finding location");

	  		window.setInterval(function(){panCurrentLocation(gmap);}, 1000);	    
	  });	  
	};	
}

var panCurrentLocation = function(myMap){	
	if(navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(function(position) {
			    var pos = new google.maps.LatLng(position.coords.latitude,
			                                       position.coords.longitude);
			    myMap.instance.setCenter(pos);
			    }, function() {
			      handleNoGeolocation(true);
			    });
  		}
}
