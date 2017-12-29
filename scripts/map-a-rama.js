
// var map;
    // marker;
var fuaitoo = {lat: 14.615323, lng: 121.106051};
var werDis;
var disAddress = document.querySelector(".coList");
var disCompany = [];

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: fuaitoo
  });

  var marker = new google.maps.Marker({
    position: fuaitoo,
    map: map,
    title: 'fuaitoo!'
  });

  for (var i = 0; i < targets.length; i++) {
    var marker = new google.maps.Marker({
      position: targets[i].position,
      map: map,
      title: targets[i].title,
      icon: {
        url: "images/icons/target.svg",
        anchor: new google.maps.Point(12, 12)
      }
    });
    marker.setOpacity(0.75);
  };

  console.log(map);

  function panDa() {
    var eh = map.getZoom();
    console.log(eh);
    var latLng = new google.maps.LatLng(targets[2].position);
    map.panTo(latLng);
  };

  function doSomething(e) {
      if (e.target !== e.currentTarget) {
          var clickedItem = e.target.classList[1];
          // alert("Hello " + clickedItem);
          // console.log(disCompany[0]);
          disCompany.push(clickedItem);
      }
      e.stopPropagation();
      huDis();
  };

  var panPath = [];   // An array of points the current panning action will use
  var panQueue = [];  // An array of subsequent panTo actions to take
  var STEPS = 50;     // The number of steps that each panTo action will undergo

  function panTo(newLat, newLng) {
    if (panPath.length > 0) {
      // We are already panning...queue this up for next move
      panQueue.push([newLat, newLng]);
    } else {
      // Lets compute the points we'll use
      panPath.push("LAZY SYNCRONIZED LOCK");  // make length non-zero - 'release' this before calling setTimeout
      var curLat = map.getCenter().lat();
      var curLng = map.getCenter().lng();
      var dLat = (newLat - curLat)/STEPS;
      var dLng = (newLng - curLng)/STEPS;

      for (var i=0; i < STEPS; i++) {
        panPath.push([curLat + dLat * i, curLng + dLng * i]);
      }
      panPath.push([newLat, newLng]);
      panPath.shift();      // LAZY SYNCRONIZED LOCK
      setTimeout(doPan, 20);
    }
  };

  function doPan() {
    var next = panPath.shift();
    if (next != null) {
      // Continue our current pan action
      map.panTo( new google.maps.LatLng(next[0], next[1]));
      setTimeout(doPan, 20 );
    } else {
      // We are finished with this pan - check if there are any queue'd up locations to pan to
      var queued = panQueue.shift();
      if (queued != null) {
        panTo(queued[0], queued[1]);
      }
    }
  };

  function huDis() {
    var getDis = disCompany.shift();

    for (var i = 0; i < targets.length; i++) {

      if (getDis === targets[i].company) {
        werDis = targets[i].position;
      }

    }
    // disCompany.push(werDis);
   // console.log(werDis.lat, werDis.lng);
   panTo(werDis.lat, werDis.lng);
  };

  disAddress.addEventListener('click', doSomething, false);

};//initMap
