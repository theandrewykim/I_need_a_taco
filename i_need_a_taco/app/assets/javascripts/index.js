
$( document ).ready(function() {
  $("#button .button_to").on("submit", function(e) {
    e.preventDefault()
    console.log("hello")
    $.ajax({
      type: 'POST',
      url: '/search',
      dataType: 'json'
    }).done(function(response) {
      var tacoPlaces = response
    }).fail(function(error){
      console.log("failed!")
    })

  });

});





  // function initialize() {
  //   var mapProp = {
  //     zoom:15,
  //     mapTypeId:google.maps.MapTypeId.ROADMAP
  //   };
  //   var map=new google.maps.Map(document.getElementById("map"),mapProp);
  //   var input = document.getElementById('pac-input');
  //   var searchBox = new google.maps.places.SearchBox(input);
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //   if(navigator.geolocation) {
  //     browserSupportFlag = true;
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  //       map.setCenter(initialLocation);
  //     }, function() {
  //       handleNoGeolocation(browserSupportFlag);
  //     });
  //   }
  //   // Browser doesn't support Geolocation
  //   else {
  //     browserSupportFlag = false;
  //     handleNoGeolocation(browserSupportFlag);
  //   }
  //   function handleNoGeolocation(errorFlag) {
  //     if (errorFlag == true) {
  //       map.setCenter(new google.maps.LatLng(0,0))
  //       map.setZoom(0)
  //     }
  //     map.setCenter(initialLocation);
  //   }
  // }
  // google.maps.event.addDomListener(window, 'load', initialize);