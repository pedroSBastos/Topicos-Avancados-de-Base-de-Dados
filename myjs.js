var map;
var servidor='http://127.0.0.1:8300/'    

var cidadePorto = {lat: 41.15, lng:  -8.61024}
var taxi =  {lat: 41.1766, lng: -8.5584 }
var iconTaxiBase = 'http://payless-taxi.com/wp-content/uploads/leaflet-maps-marker-icons/sportutilityvehicle.png'
var iconPracaBase ='http://us.123rf.com/450wm/arnica/arnica1307/arnica130700098/21355222-green-map-pointer-with-taxi-icon.jpg?ver=6'




function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: cidadePorto,
        zoom: 12
     });
   	
   }


// Create a marker and set its position.
function initMarker(coor){
	var marker = new google.maps.Marker({
    map: map,
    position: coor,

    title: 'Ponto'
  });
/*
	map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });
*/

  marker.addListener('click', function() {
    map.setZoom(15);
    map.setCenter(marker.getPosition());
  });
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  location.reload();
}


function getPracas(){

//var xpto="a";
//console.log(xpto);
settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getPracas",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;

 				var  t = JSON.parse(response);
 				//console.log(t['x']);
 				//console.log(t.x);

 				for(var i=0; i<61; i++){

 				//console.log(JSON.parse(response));
 				console.log(t[i]);
 				initMarker(t[i]);
 				}
 				//console.log(JSON.parse(response).length);
 				//console.log(response.praca_id);
 			
        });
  //     console.log(xpto);
}


function getTaxi_27(){

settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getTaxi",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;

 				var  t = JSON.parse(response);
 			
 				var percurso = new google.maps.Polyline({
 					path:t ,
 					geodesic : true , 
 					strokeColor: '#FF0000',
 					strokeOpacity: 1.0 ,
 					strokeWeight: 2

 				});

 				percurso.setMap(map);
					  // Define the symbol, using one of the predefined paths ('CIRCLE')
					  // supplied by the Google Maps JavaScript API.
					  var lineSymbol = {
					    path: google.maps.SymbolPath.CIRCLE,
					    scale: 8,
					    strokeColor: '#393'
					  };
     

 				 var line = new google.maps.Polyline({
				    path: t,
    				icons: [{
    					icon: lineSymbol,
    					offset: '100%'}],
				    map: map
  					});

  				animateCircle(line);

        });
  //     console.log(xpto);
	}

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 20);
}



function getpraca_maior(){

settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getPracas/maior",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;
 				var  t = JSON.parse(response);
 				console.log(t);
 				console.log(t[0]);
 				initMarker(t[0]);

        });
  //    
	}

function getTaxi_parado(){

settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getTaxi/parado",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;
 				var  t = JSON.parse(response);
 				console.log(t);
 				console.log(t[0]);
 				initMarker(t[0]);

        });
  //    
	}


function getPraca_menorDistancia(){

settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getPraca/menorDistancia",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;
 				var  t = JSON.parse(response);
 				for(var i=0;i<t.length;i++){
 					initMarker(t[i]);
 			}
			var percurso = new google.maps.Polyline({
 					path:t ,
 					geodesic : true , 
 					strokeColor: '#FF0000',
 					strokeOpacity: 1.0 ,
 					strokeWeight: 2

 				});


 				percurso.setMap(map); 			

        });
  //    
	}

function getPraca_menosUsada(){

settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getPraca/menosSucesso",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;
 				var  t = JSON.parse(response);
 				console.log(t);
 				console.log(t[0]);
 				initMarker(t[0]);

        });
  //    
	}


function getAllTaxiAnimation(){
  settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getTaxi_All",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
    

        var  t = JSON.parse(response);

       // percurso.setMap(map);
            // Define the symbol, using one of the predefined paths ('CIRCLE')
            // supplied by the Google Maps JavaScript API.
            var lineSymbol = {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              strokeColor: '#393'
            };
     
            for(var i=0; i< t.length; i++ ){
              var line = new google.maps.Polyline({
                path: t,
                icons: [{
                icon: lineSymbol,
                offset: '100%'}],
                map: map
            });
          animateCircle(line);
        }
  });
}



function getPraca_maisProxima(){
  settings = {
            "method": "GET",
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/getPraca/maisProxima_DCC",
            //41.157334, -8.628002
        };

        $.ajax(settings).done(function (response) {
            //initMarker();
            //xpto=xpto+""+response;
 //           xpto=response;
        var  t = JSON.parse(response);
        console.log(t);
        console.log(t[0]);
        initMarker(t[0]);

        });

}