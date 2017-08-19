import sqlite3
import csv
import re

avgwage = csv.reader(open('Data USA Cart GINI.csv'))


# Importing .csv data into DB for all occupations
conn = sqlite3.connect('dataUSA.sqlite')
cur = conn.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS AverageWage
    (occ TEXT UNIQUE, avg2014 REAL, avg2015 REAL,
     ppl2014 INTEGER, ppl2015 INTEGER)''')

rownum = 0
for row in avgwage:
    if rownum == 0: header = row
    else:
        cur.execute('''INSERT OR IGNORE INTO AverageWage ( occ, avg2014, avg2015, ppl2014, ppl2015)
        VALUES ( ?, ?, ?, ?, ? )''', ( row[0], row[3], row[4], row[7], row[8]))
    rownum += 1
conn.commit()


# Sum of all people in analysis per year
allppl14 = 0
for row in cur.execute('SELECT ppl2014 FROM AverageWage'):
    allppl14 += row[0]
allppl15 = 0

for row in cur.execute('SELECT ppl2015 FROM AverageWage'):
    allppl15 += row[0]




cur.close()


