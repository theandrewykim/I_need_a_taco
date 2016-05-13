 var tacoEats = []
 function tacoPlace(latitude, longitude, name, image, url, ratingImg, map) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.restaurantName = name;
  this.map = map;
  this.image = image
  this.url = url
  this.ratingImg = ratingImg
  this.marker = new google.maps.Marker({position: new google.maps.LatLng(this.latitude, this.longitude), map: this.map, icon: '/assets/tacoicon.png'})
  this.infowindow = new google.maps.InfoWindow({content: '<a href='+this.url+'>'+this.restaurantName+'</a><br><img src='+this.ratingImg+'><br><img src="'+this.image+'">"'})
  this.addClickListenerToMarker();
}

var oldinfowindow = 0;
tacoPlace.prototype.addClickListenerToMarker = function() {
  this.marker.addListener('click', function() {
    if (oldinfowindow !=  0){
    oldinfowindow.close()
  }
    this.infowindow.open(this.map, this.marker);
    oldinfowindow = this.infowindow
  }.bind(this));
};




var userLatitude;
var userLongitude;
var tacoMaps;
var map;
var marker;


function initialize() {
  var mapProp = {
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"),mapProp);
  var input = document.getElementById('pac-input');

  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      userLatitude = position.coords.latitude
      userLongitude = position.coords.longitude
      map.setCenter(initialLocation);


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
    $("#button .button_to").on("submit", function(e) {
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/search',
        data: {latitude: userLatitude, longitude: userLongitude},
        dataType: 'json'
      }).done(function(response) {
        tacoEats = response.businesses
        tacoMaps = tacoEats.map(function(restaraunt) { return new tacoPlace(restaraunt.location.coordinate.latitude, restaraunt.location.coordinate.longitude, restaraunt.name, restaraunt.image_url, restaraunt.url, restaraunt.rating_img_url_small, map) });
      }).fail(function(error){
        console.log("failed!")
      })

    });

  });

