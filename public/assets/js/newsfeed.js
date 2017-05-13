$(document).ready(function() {

	$.ajax({
		method: "GET",
		url: "/api/newsfeed/",
	}).done(function(newsfeed) {
		$("#content").append(newsfeed);

    });
});