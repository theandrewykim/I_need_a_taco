 var tacoEats = []
 function tacoPlace(latitude, longitude, name, map) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.name = name;
  this.map = map;
  this.marker = new google.maps.Marker({position: new google.maps.LatLng(this.latitude, this.longitude)});
  this.infowindow = new google.maps.InfoWindow({content: '<a href="recordings/'+this.id+'">'+this.title+'</a>'});
  this.marker.setMap(this.map);
  this.addListenerToMarker();
}


tacoPlace.prototype.addListenerToMarker = function() {
  this.marker.addListener('click', function() {
    this.infowindow.open(this.map, this.marker);
  }.bind(this));
};

var userLatitude
var userLongitude


  function initialize() {
    var mapProp = {
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"),mapProp);
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        userLatitude = position.coords.latitude
        userLongitude = position.coords.longitude
        map.setCenter(initialLocation);
    $("#button .button_to").on("submit", function(e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {latitude: userLatitude, longitude: userLongitude},
      dataType: 'json'
    }).done(function(response) {
      tacoEats = response.businesses
      return new tacoPlace(tacoEats[0].location.coordinate.latitude, tacoEats[0].location.coordinate.longitude)
      debugger
    }).fail(function(error){
      console.log("failed!")
    })

  });
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    }
    // Browser doesn't support Geolocation
    else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }
    function handleNoGeolocation(errorFlag) {
      if (errorFlag == true) {
        map.setCenter(new google.maps.LatLng(0,0))
        map.setZoom(0)
      }
      map.setCenter(initialLocation);
    }
  }
  google.maps.event.addDomListener(window, 'load', initialize);


$( document ).ready(function() {
  // $("#button .button_to").on("submit", function(e) {
  //   e.preventDefault()
  //   $.ajax({
  //     type: 'POST',
  //     url: '/search',
  //     data: {latitude: userLatitude, longitude: userLongitude},
  //     dataType: 'json'
  //   }).done(function(response) {
  //     tacoEats = response.businesses
  //     new tacoPlace(tacoEats[0].location.coordinate.latitude, tacoEats[0].location.coordinate.longitude)
  //   }).fail(function(error){
  //     console.log("failed!")
  //   })

  // });

});

