import psycopg2
import ppygis
import os
 
# Connect to an existing spatially enabled database
connection = psycopg2.connect(database = 'taxis', user = 'root', password="12345")
cursor = connection.cursor()
 
print(cursor)
 
#criar tabela
cursor.execute('CREATE TABLE praca(praca_id integer, nome text, posicao GEOGRAPHY(POINT,4326), estacionamento GEOGRAPHY(LINESTRING,4326), acesso GEOGRAPHY(POINT,4326));')
 
l = [line.rstrip('\n') for line in open('posturas.txt')]
 
id_p=''
nome_p=''
posicao=''
coor_1=''
coor_2=''
jump=True
index=2
 
for i in range(len(l)):
    if(l[i][0]!='-' and not(l[i][0].isdigit())):
        index=i+5
        id_p=l[i-1]
        nome_p=l[i]
        posicao=l[i+1]
        coor_1=l[i+3]
        coor_2=l[i+4]
        jump=True
    elif(l[i][0]=='-' and jump==False):
        v = l[i].split()
        p = posicao.split()
        c_1 = coor_1.split()
        c_2 = coor_2.split()
        #n=nome_p.lower()
        #print('INSERT INTO praca VALUES('+id_p+',\''+n+'\',ST_GeomFromText(\'POINT('+p[1]+' '+p[0]+')\', 4326),ST_GeomFromText(\'LINESTRING('+c_1[1]+' '+v[0]+','+c_2[1]+' '+c_2[0]+')\', 4326),ST_GeomFromText(\'POINT('+v[1]+' '+v[0]+')\', 4326));')
        cursor.execute('INSERT INTO praca VALUES('+id_p+',\''+nome_p+'\',ST_GeomFromText(\'POINT('+p[1]+' '+p[0]+')\', 4326),ST_GeomFromText(\'LINESTRING('+c_1[1]+' '+v[0]+','+c_2[1]+' '+c_2[0]+')\', 4326),ST_GeomFromText(\'POINT('+v[1]+' '+v[0]+')\', 4326));')
    elif(index==i):
        jump=False
 
connection.commit()
cursor.close()
connection.close()