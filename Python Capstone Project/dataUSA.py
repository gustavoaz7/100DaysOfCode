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

# For all occupations:
# Sum of people in analysis per year
allppl14 = 0
for row in cur.execute('SELECT ppl2014 FROM AverageWage'):
    allppl14 += row[0]
allppl15 = 0

for row in cur.execute('SELECT ppl2015 FROM AverageWage'):
    allppl15 += row[0]


# Sum of people per range of wage
pplwage14 = [0] * 21
for row in cur.execute('SELECT avg2014, ppl2014 FROM AverageWage'):
    for i in range(20) :
        if row[0] < 10000*(i+1) : 
            pplwage14[i] += row[1]
            break
        if row[0] >= 200000 : 
            pplwage14[20] += row[1]
            break

pplwage15 = [0] * 21
for row in cur.execute('SELECT avg2015, ppl2015 FROM AverageWage'):
    for i in range(20) :
        if row[0] < 10000*(i+1) : 
            pplwage15[i] += row[1]
            break
        if row[0] >= 200000 : 
            pplwage15[20] += row[1]
            break

cur.close()

# Calculating % share of each wage range
for i in range(len(pplwage14)):
    pplwage14[i] = pplwage14[i]/allppl14 * 100

for i in range(len(pplwage15)):
    pplwage15[i] = pplwage15[i]/allppl15 * 100


wageRange = ['<10K', '10-20K', '20-30K', '30-40K', '40-50K', '50-60K', '60-70K', '70-80K', '80-90K', 
    '90-100K', '100-110K', '110-120K', '120-130K', '130-140K', '140-150K', '150-160K', '160-170K', 
    '170-180K', '180-190K', '190-200K', '>200K']

# Creating a JS file to be loaded by .htm file
fhand = open('dataUSAline.js','w')
fhand.write("dataUSAline = [ ['Wage Ranges', '2014', '2015']")

for i in range(len(pplwage14)):
    fhand.write(",\n['" + wageRange[i] + "'," + str(round(pplwage14[i],4)) + ',' + str(round(pplwage15[i],4)) + "]")
fhand.write("\n];\n")



