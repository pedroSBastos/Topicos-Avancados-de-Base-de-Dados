var cors = require('cors');
var http = require('http');

var bodyparser = require("body-parser");

var pg = require('pg');
var express = require('express');
var app = express();
var id =-1;


var conString = "pg://root:12345@localhost:5432/taxis";
var client = new pg.Client(conString);

var corsOptions = {
    origin : [,"http://localhost:8080","http://localhost", "*"]
};

app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json());
app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getHello', function(req, res){
  console.log("entra aqui");
  res.send("hello world");

});


app.get('/getPracas',function (req,res){

		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("select distinct ST_X(posicao::geometry) as lat ,ST_Y(posicao::geometry) as lng from praca;",function(err, result) {
            //call `done()` to release the client back to the pool
            //done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });



app.get('/getTaxi',function (req,res){
	 
		console.log("Is this real life?");
		
		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("select  id, (ST_Length(ST_MakeLine(posicao::geometry))*1000) As km_roads from taxis group by id order by km_roads desc limit 1;",function(err, result) {
            //call `done()` to release the client back to the pool
            //done();

            if(err) {
                return console.error('error running query', err);
            }
           	id=result.rows[0].id;
           	//console.log(id);
           // res.send(JSON.stringify(result.rows));
            //output: 1
        });


			//2 parte da query
			client = new pg.Client(conString);
			client.connect(function(err) {
    		
    		if(err) {
    		return console.error('could not connect to 2 query', err);
    				}
			});

			console.log(id +"teste");
			var query = client.query("select ST_X(posicao::geometry) as lat , ST_Y(posicao::geometry) as lng from taxis where id=27;" ,function(err, result) {
            //call `done()` to release the client back to the pool
            //done();

            if(err) {
                return console.error('error running query', err);
            }

            res.send(JSON.stringify(result.rows));

        });
});


app.get('/getPracas/maior',function (req,res){

		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("select ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng from praca where praca_id in(select praca_id from(select praca_id, (ST_Length(estacionamento)) As area from praca order by area desc limit 1) as max);"
						,function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });


app.get('/getTaxi/parado',function (req,res){

		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT id,posicao,COUNT(*) as conta FROM taxis GROUP BY id,posicao ORDER BY conta DESC LIMIT 1) as max;"
						,function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });

app.get('/getPraca/menorDistancia',function (req,res){

		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("(SELECT ST_X(one::geometry) as lat, ST_Y(one::geometry) as lng from (SELECT p1.posicao as one, p2.posicao as two, ST_Distance(p1.posicao::geometry,p2.posicao::geometry) as dist FROM praca as p1, praca as p2 WHERE p1.praca_id!=p2.praca_id order by dist limit 1) as first) UNION (SELECT ST_X(two::geometry) as lat, ST_Y(two::geometry) as lng from (SELECT p1.posicao as one, p2.posicao as two, ST_Distance(p1.posicao::geometry,p2.posicao::geometry) as dist FROM praca as p1, praca as p2 WHERE p1.praca_id!=p2.praca_id order by dist limit 1) as first);"
						,function(err, result) {
            
            	if(err) {
                return console.error('error running query', err);
           		 }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });

app.get('/getPraca/menosSucesso',function (req,res){

		var client = new pg.Client(conString);

	
    	client.connect(function(err) {
    		if(err) {
    		return console.error('could not connect to postgres', err);
    				}
		});

	var query = client.query("SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT posicao,COUNT(*) as conta FROM taxis GROUP BY posicao ORDER BY conta desc limit 1) as max;"
						,function(err, result) {
            
            	if(err) {
                return console.error('error running query', err);
           		 }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });




app.get('/getTaxi_All',function (req,res){

        var client = new pg.Client(conString);

    
        client.connect(function(err) {
            if(err) {
            return console.error('could not connect to postgres', err);
                    }
        });

    var query = client.query("select distinct ST_X(posicao::geometry) as lat ,ST_Y(posicao::geometry) as lng from taxis;",function(err, result) {
            //call `done()` to release the client back to the pool
            //done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });




app.get('/getPraca/maisProxima_DCC',function (req,res){

        var client = new pg.Client(conString);

    
        client.connect(function(err) {
            if(err) {
            return console.error('could not connect to postgres', err);
                    }
        });

    var query = client.query("SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT  posicao,ST_Distance(ST_GeogFromText('SRID=4326;POINT(41.152495 -8.640534)'), posicao::geometry) as dist FROM praca ORDER BY dist LIMIT 1) as max;"
                        ,function(err, result) {
            
                if(err) {
                return console.error('error running query', err);
                 }
            console.log(JSON.stringify(result.rows));
            res.send(JSON.stringify(result.rows));
            //output: 1
        });

        });



 // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

