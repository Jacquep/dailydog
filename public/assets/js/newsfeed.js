$(document).ready(function() {

	$.ajax({
		method: "GET",
		url: "/api/newsfeed/",
	}).done(function(newsfeed) {
		console.log(newsfeed);
		$("#content").append(newsfeed);

    });
});