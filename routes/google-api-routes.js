
Google geolocation API Key: AIzaSyC5qIN5cffCLTjGEULL8SSf3DgIPH0Of7c

https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

// MAP: google search "pet friendly restaurants San Diego"
// <iframe width="600" height="450" frameborder="0" style="border:0"
// src="https://www.google.com/maps/embed/v1/search?q=Pet+friendly+restaurants+San+Diego&key=..." allowfullscreen></iframe>

// //another example:
// <iframe
//   width="600"
//   height="450"
//   frameborder="0" style="border:0"
//   src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY
//     &q=Space+Needle,Seattle+WA" allowfullscreen>
// </iframe>

//-------------------------------------------------------------

//GOOGLE SAMPLE Search place:Based on user location or search string
function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });

  // Specify location, radius and place types for your Places API search.
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['store']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------------------------------------------------------

//GOOGLE sample search: display place details once the user click on location
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  document.getElementById('submit').addEventListener('click', function() {
    placeDetailsByPlaceId(service, map, infowindow);
  });
}

function placeDetailsByPlaceId(service, map, infowindow) {
  // Create and send the request to obtain details for a specific place,
  // using its Place ID.
  var request = {
    placeId: document.getElementById('place-id').value
  };

  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // If the request succeeds, draw the place location on the map
      // as a marker, and register an event to handle a click on the marker.
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });

      map.panTo(place.geometry.location);
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);

//--------------------------------------------------------------

//Google sample search: AUTOCOMPLETE/suggest the user's search input

PLACE SEARCH PLACE DETAILS PLACE AUTOCOMPLETE
function initialize() {
  var mapOptions = {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  // Create the autocomplete helper, and associate it with
  // an HTML text input box.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  // Get the full place details when the user selects a place from the
  // list of suggestions.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace(/** @type {!google.maps.Place} */ ({
      placeId: place.place_id,
      location: place.geometry.location
    }));
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '</div>');
    infowindow.open(map, marker);
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);
