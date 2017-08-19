import sqlite3
import csv
import re

avgwage = csv.reader(open('Data USA Cart GINI.csv'))

# Importing .csv data into DB for Computer Science related occupations

conn1 = sqlite3.connect('dataUSAcs.sqlite')
cur1 = conn1.cursor()
cur1.execute('''CREATE TABLE IF NOT EXISTS AvgCS
    (occ TEXT UNIQUE, avg2014 REAL, avg2015 REAL,
     ppl2014 INTEGER, ppl2015 INTEGER)''')

rownum = 0
for row in avgwage:
    if rownum == 0: header = row
    else:
        if re.match('computer|software|information|web|database', row[0], re.I) :
            cur1.execute('''INSERT OR IGNORE INTO AvgCS ( occ, avg2014, avg2015, ppl2014, ppl2015)
        VALUES ( ?, ?, ?, ?, ? )''', (row[0], row[3], row[4], row[7], row[8]))
    rownum += 1
conn1.commit()


# Sum of all people in analysis per year
allppl14 = 0
for row in cur1.execute('SELECT ppl2014 FROM AvgCS'):
    allppl14 += row[0]
allppl15 = 0
for row in cur1.execute('SELECT ppl2015 FROM AvgCS'):
    allppl15 += row[0]






cur1.close()
