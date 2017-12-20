/**
Praça com maior comprimento
*/
select posicao from praca where praca_id in(select praca_id from(select praca_id, (ST_Length(estacionamento)) As area from praca order by area desc limit 1) as max);

/**
Selecionar o percurso do taxi que percorreu a maior distancia. 
*/
SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT id,posicao,COUNT(*) as conta FROM taxis GROUP BY id,posicao ORDER BY conta DESC LIMIT 1) as max;


/***
Selecionar o taxi que passou mais tempo parado na mesma posição. 
*/
SELECT id,COUNT(*) as conta FROM taxis GROUP BY id,posicao ORDER BY conta DESC LIMIT 1;

/***
selecionar as praças mais proximas
**/
(SELECT ST_X(one::geometry) as lat, ST_Y(one::geometry) 
	as lng from (SELECT p1.posicao as one, p2.posicao as two, ST_Distance(p1.posicao::geometry,p2.posicao::geometry) 
		as dist FROM praca as p1, praca as p2 WHERE p1.praca_id!=p2.praca_id order by dist limit 1) 
	as first) UNION (SELECT ST_X(two::geometry) as lat, ST_Y(two::geometry) 
	as lng from (SELECT p1.posicao as one, p2.posicao as two, ST_Distance(p1.posicao::geometry,p2.posicao::geometry) 
		as dist FROM praca as p1, praca as p2 WHERE p1.praca_id!=p2.praca_id order by dist limit 1) as first);

/***
Praça com menos sucesso
**/
SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT posicao,COUNT(*) as conta FROM taxis GROUP BY posicao ORDER BY conta desc limit 1) as max;

/**
selecionar o id dos taxista com maior tempo de serviço
*/
SELECT id FROM taxis GROUP BY id HAVING MAX(time)-MIN(time)=(SELECT (MAX(time)-MIN(time)) as tempo FROM taxis GROUP BY id ORDER BY tempo DESC LIMIT 1);
/*
praça de taxis mais proxima do dcc
*/
SELECT ST_X(posicao::geometry) as lat, ST_Y(posicao::geometry) as lng FROM (SELECT  posicao,ST_Distance(ST_GeogFromText('SRID=4326;POINT(41.152495 -8.640534)'), posicao::geometry) as dist FROM praca ORDER BY dist LIMIT 1) as max;
