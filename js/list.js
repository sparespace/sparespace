$(function() {
  init_maps();

  var vm = {
    listings: [
      { title: 'Dry Basement for Rent', verified: true, positive_reviews: 26, negative_reviews: 0, cost: 20, photo_url: "img/space-01.png" },
      { title: 'Spare Bedroom for Rent', verified: false, positive_reviews: 11, negative_reviews: 1, cost: 12, photo_url: "img/space-02.png" },
      { title: 'Large Spacious Attic', verified: true, positive_reviews: 2, negative_reviews: 0, cost: 15, photo_url: "img/space-03.png" },
      { title: 'Basement Nook', verified: true, positive_reviews: 8, negative_reviews: 0, cost: 25, photo_url: "img/space-04.png" }
    ]
  };
  ko.applyBindings(vm);
});

function init_maps() {
  var startup_weekend = new google.maps.LatLng(40.461642,-79.925473);

  // Show map of Pittsburgh
  var canvas = $('#map-canvas');
  var map = new google.maps.Map(canvas.get(0), {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: startup_weekend
  });

  var markers = [
    startup_weekend,
    // Thrill Mill
    new google.maps.LatLng(40.462556, -79.918327),
    // Heinz Field
    new google.maps.LatLng(40.431368, -79.9805),
    // Carnegie Museum
    new google.maps.LatLng(40.446674, -80.015688)
  ];

  function drop_marker() {
    add_marker(map, markers.pop());
  }

  function drop_all() {
    for (var i = 0; i < markers.length; i++) {
      setTimeout(function() {
        drop_marker();
      }, i * 200);
    }
  }

  setTimeout(function() {
    drop_all();
  }, 1000);
}

function add_marker(map, position) {
  var marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: position
  });

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  google.maps.event.addListener(marker, 'click', toggleBounce);
  return marker;
}
