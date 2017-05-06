(function(){
    function loadMapScenario() {
        $('#btnBing').click(function() {
            var mapElement = document.getElementById('bingMap');
            mapElement.style.display = 'block';
            var map = new Microsoft.Maps.Map(mapElement, {
                credentials: 'AvCGQHA6sT5pajCmfUPq0EGHbaSNFYwDm2koMCa8-6CaouIFfzoiDB-MZKOXOyLj',
                center: new Microsoft.Maps.Location(47.60357, -122.32945)
            });
            var pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(10, map.getBounds());
            var infobox = new Microsoft.Maps.Infobox(pushpins[0].getLocation(), { visible: false });
            infobox.setMap(map);
            for (var i = 0; i < pushpins.length; i++) {
                var pushpin = pushpins[i];
                //Store some metadata with the pushpin
                pushpin.metadata = {
                    title: 'Pushpin ' + i,
                    description: 'Discription for pushpin' + i
                };
                Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
                    infobox.setOptions({
                        location: args.target.getLocation(),
                        title: args.target.metadata.title,
                        description: args.target.metadata.description,
                        visible: true
                    });
                });
            }
            map.entities.push(pushpins);

            Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', function () {
                var manager = new Microsoft.Maps.Traffic.TrafficManager(map);
                manager.show();
            });

            $('#btnBing').hide();
        });

    }

    window.loadMapScenario = loadMapScenario
})();