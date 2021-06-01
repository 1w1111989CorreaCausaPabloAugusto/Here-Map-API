function moveMapToBuenosAires(map) {
    map.setCenter({lat:-34.6083, lng:-58.3712});
    map.setZoom(10);
  }
  var platform = new H.service.Platform({
      apikey: `NKBy18nXyEjjEqmItiqUlr8J-coXLKMhlzJ-HKnDd1E` // replace with your api key
  });
  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over Europe
  var map = new H.Map(document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  // Now use the map as required...
  window.onload = function () {
    moveMapToBuenosAires(map);
    getDeafultLocation();
  }  
  const autosuggest = (e) => {
    if(event.metaKey){
      return
    }

  let searchString = e.value
  if (searchString != "") {
    fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${platform.a}&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`)
    .then((res) => res.json())
    .then((json) => {
      if (json.length != 0) {
        document.getElementById("list").innerHTML = ``;
        let dropData = json.items.map((item) => {
          if ((item.position != undefined) & (item.position != ""))
            document.getElementById("list").innerHTML += `<li onClick="addMarkerToMap(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`;
        });
      }
    });
  }
  };
  // to get deafult location after loading the page
  function getDeafultLocation(){
    var lat=-34.6083;
    var lng=-58.3712;
    var title = "Ciudad Autonoma de Buenos Aires";
    addMarkerToMap(lat, lng, title);
  }
  // adding marker to map
  const addMarkerToMap = (lat, lng, title) => {
    map.removeObjects(map.getObjects())
    document.getElementById("search").value =  title;
    var selectedLocationMarker = new H.map.Marker({ lat, lng });
    map.addObject(selectedLocationMarker);
    document.getElementById("list").innerHTML = ``;
    map.setCenter({ lat, lng }, true);
  };  
 function obtenerUbicacion(){
   var lat = document.getElementById('lat').value;
   var lng = document.getElementById('lng').value;
   var title = "";
   addMarkerToMap(lat,lng,title);
 }