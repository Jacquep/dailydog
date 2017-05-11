$(document).ready(function(){
	// URL to use in ajax GET request 	
	//var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.8549494,-117.2541698&radius=50000&type=restaurant&keyword=dog_friendly&key=AIzaSyAZD1z7QkFQS450oXJL0bbCMw_NSzlVS-E';
	var queryURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBz76vzz7WYfzokwcZw8p2kFUotx8wyoRg&callback=initMap';
	// Perform AJAX GET request to get data from an Google API
	$.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'json',
        cache: false
	}).done(function hndlr(response) {
		console.log("response",response);
		for (var i = 0; i < response.results.length; i++) {
			var name = response.results[i].name;
			var location = response.results[i].vicinity;
		
			var restaurant = $("<div>");
			restaurant.attr("class","round")

			var restaurantName = $("<h5>");
			restaurantName.text(name);
			var restaurantLocation = $("<p>");
			restaurantLocation.text(location);

			restaurantName.appendTo(restaurant);
			restaurantLocation.appendTo(restaurant);

			$("#content").append(restaurant);
		}
	})
});