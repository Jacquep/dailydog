$(document).ready(function(){

  $("#user-location").keypress(function (event) {
    if (event.which == 13) {             
    event.preventDefault();
    }
  });


  var map;
  var service;
  var infowindow;

  function initialize() {


    var sandiego = new google.maps.LatLng(32.8530884,-117.1828825);

    map = new google.maps.Map(document.getElementById('map'), {
      center: sandiego,
      zoom: 15
    });
    
   
    var request = {
      location: sandiego,
      radius: '50000',
      types: [' pet_store'],
      keyword: ['groomer'],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

   
  }

  function callback(response,status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < response.length; i++) {

    
        var name = response[i].name;
    		var location = response[i].vicinity;
        var image = response[i].photos[0].getUrl({'maxWidth': 300, 'maxHeight': 200});
        var bizURL = response[i].website; 
        // console.log(bizURL);
    		
    		var bizDiv = $("<div>");
    		bizDiv.attr("class","col s12");

        var bizDiv2 = $("<div>");
        bizDiv2.attr("class","card horizontal");

        var bizImgDiv = $("<div>");
        bizImgDiv.attr("class", "card-image");
        bizImgDiv.attr("id", "biz-image");
        bizImgDiv.css("background", "url(" + image + ")");


        var bizDetails = $("<div>");
        bizDetails.attr("class","card-stacked");

        var bizDetails2 = $("<div>");
        bizDetails2.attr("class","card-content");
      
    		var bizName = $("<h6>");
    		bizName.text(name);

    		var bizLocation = $("<p>");
    		bizLocation.text(location);

        var bizLinkDiv = $("<div>");
        bizLinkDiv.attr("class","card-action");

        // var bizLinkAnchor = $("<a>");
        // bizLinkAnchor.text("Visit Business Website")
        // bizLinkAnchor.attr("href", bizURL);

        bizImgDiv.appendTo(bizDiv2);

    		bizName.appendTo(bizDetails2);
    		bizLocation.appendTo(bizDetails2);

        bizDetails2.appendTo(bizDetails);
        bizDetails.appendTo(bizDiv2);

        // bizLinkAnchor.appendTo(bizLinkDiv);
        // bizLinkDiv.appendTo(bizDiv2);

        bizDiv2.appendTo(bizDiv);

    		$("#search-results").append(bizDiv);     
      }
    }
 }

 initialize();
});
