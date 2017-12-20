import psycopg2
import ppygis
import os
 
# Connect to an existing spatially enabled database
connection = psycopg2.connect(database = 'taxis', user = 'root', password='12345')
cursor = connection.cursor()
 
#print(cursor)
 
#criar tabela
cursor.execute('CREATE TABLE taxis(id integer, time timestamp, posicao GEOGRAPHY(POINT,4326));')
 
 
files = os.listdir("logs/")
#print(files)
for f in files:
    lines = [line.rstrip('\n') for line in open("logs/"+f)]
    id_t = f.split('.')[0]
    for l in lines:
        v = l.split()
        #print('INSERT INTO taxis VALUES('+id_t+',to_timestamp('+v[0]+'),ST_GeomFromText(\'POINT('+v[2]+','+v[1]+')\', 4326));')
        cursor.execute('INSERT INTO taxis VALUES('+id_t+',to_timestamp('+v[0]+'),ST_GeomFromText(\'POINT('+v[2]+' '+v[1]+')\', 4326));')
        #print(v)
 
connection.commit()
cursor.close()
connection.close()
