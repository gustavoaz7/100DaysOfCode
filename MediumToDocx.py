# Web Scraping may change according to updates on the website.
# Working for Medium articles - September 2017

import urllib3  # https://urllib3.readthedocs.io/en/latest/user-guide.html
from bs4 import BeautifulSoup  # https://www.crummy.com/software/BeautifulSoup/bs4/doc
from docx import Document  # https://python-docx.readthedocs.io/en/latest/
import re

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Creating a Word document
document = Document()

url = input('Medium article URL: ')

# You’ll need a PoolManager instance to make requests. 
# This object handles all of the details of connection pooling and thread safety 
http = urllib3.PoolManager()
# Making a request
r = http.request('GET', url)

# Using BeautifulSoup to parse HTML data
soup = BeautifulSoup(r.data, 'html.parser')

# This is where it gets customized to the website you are scraping from.
# After looking at around 12 articles I've came up with this architecture.
# The main contents are always nested in divs with the following classes:
# 'sectionLayout--insetColumn' OR 'section--body'
body = soup.find_all('div', class_='sectionLayout--insetColumn')
# The first content of the first body is a 'h1' tag, therefore out title.
title = body[0].contents[0].text

def writeToDoc(block):
    for p in block:  # Looping through each tag
        if 'figure' != p.name or 'graf--mixtapeEmbed' in p['class']: 
            # This will ignore images tags and its labels. And also embedded links
            if [''.join(p.text.strip().split())] == ['CallToAction']: break # [Optional] I usually ignore this section.
            # print(p.text.strip())
            document.add_paragraph(p.text.strip())  # Adding text to document.

# Looping through each div
for block in body:
    writeToDoc(block)

# Same looping structure for divs with class="section--body"
body2 = soup.find_all('div', class_='section--body')
for block in body2:
    writeToDoc(block)
    
# Removing forbidden characters from filename
filename = re.sub('[:.*\/?|<>]', '',title)+'.docx'
# print(filename)
document.save(filename)

