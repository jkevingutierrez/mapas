(function() {
    var map;
    var infowindow;

    function initMap() {
        $('#btnGoogle').click(function() {
            var mapElement = document.getElementById('googleMap');
            mapElement.style.display = 'block';
            var pyrmont = { lat: -33.867, lng: 151.195 };

            map = new google.maps.Map(mapElement, {
                center: pyrmont,
                zoom: 15
            });

            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pyrmont,
                radius: 500,
                type: ['store']
            }, callback);

            addYourLocationButton(map);

            $('#btnGoogle').hide();
            
        });
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function addYourLocationButton(map) {
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0 0';
        secondChild.style.backgroundRepeat = 'no-repeat';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'center_changed', function () {
            secondChild.style['background-position'] = '0 0';
        });

        firstChild.addEventListener('click', function () {
            var imgX = '0',
                animationInterval = setInterval(function () {
                    imgX = imgX === '-18' ? '0' : '-18';
                    secondChild.style['background-position'] = imgX+'px 0';
                }, 500);

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(latlng);
                    clearInterval(animationInterval);
                    secondChild.style['background-position'] = '-144px 0';
                });
            } else {
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '0 0';
            }
        });

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }

    window.initMap = initMap;
})();
