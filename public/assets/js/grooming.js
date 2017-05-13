$(document).ready(function(){


  var map;
  var service;
  var infowindow;

  function initialize() {


    var sandiego = new google.maps.LatLng(32.8549494,-117.2541698);

    map = new google.maps.Map(document.getElementById('map'), {
      center: sandiego,
      zoom: 15
    });
    
   
    var request = {
      location: sandiego,
      radius: '50000',
      types: ['pet_store'],
      keyword: ['dog_friendly'],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

   
  }

  function callback(response,status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < response.length; i++) {

    
        	var name = response[i].name;
    		var location = response[i].vicinity;
    		
    		var store = $("<div>");
    		store.attr("class","round")

    		var storeName = $("<h5>");
    		storeName.text(name);
    		var storeLocation = $("<p>");
    		storeLocation.text(location);

    		storeName.appendTo(store);
    		storeLocation.appendTo(store);

    		$("#content").append(store);     
      }
    }
 }

 initialize();
});