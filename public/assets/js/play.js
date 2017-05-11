$(document).ready(function(){
	// URL to use in ajax GET request 	
	var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.8549494,-117.2541698&radius=50000&type=park&keyword=dog_friendly&key=AIzaSyAZD1z7QkFQS450oXJL0bbCMw_NSzlVS-E';
	// Perform AJAX GET request to get data from an Google API
	$.ajax({
        url: queryURL,
        method: "GET"
	}).done(function hndlr(response) {
		console.log("response",response);
		for (var i = 0; i < response.results.length; i++) {
			var name = response.results[i].name;
			var location = response.results[i].vicinity;
		
			var park = $("<div>");
			park.attr("class","content")

			var parkName = $("<h3>");
			parkName.text(name);
			var parkLocation = $("<small>");
			parkLocation.text(location);

			parkName.appendTo(park);
			parkLocation.appendTo(park);

			$("#content").append(park);
		}
	})
});