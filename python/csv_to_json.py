# convert Google Docs CSV to JSON file

import json
import csv

userfile = 'users_mn.csv'
# add to a cleaned user dictionary for kenny
jsondata = {}
with open(userfile, newline='') as csvfile:
    spamreader = csv.DictReader(csvfile)
    for row in spamreader:
        # print(row)
        del row['Email Address']
        del row['What is your t-shirt size?']

        key = row['What is your Advent of Code Username? (Make sure you are logged in to see it!)'].strip()
        jsondata[key] = row

    csvfile.close()

# Open a json writer, and use the json.dump()
with open('./users_mn.json', 'w', encoding='utf-8') as jsonf:
    json.dump(jsondata, jsonf, indent=2)
    jsonf.close()

userfile = 'users_roch.csv'
# add to a cleaned user dictionary for kenny
jsondata = {}
with open(userfile, newline='') as csvfile:
    spamreader = csv.DictReader(csvfile)
    for row in spamreader:
        # print(row)
        del row['Email Address']
        del row['What is your t-shirt size?']

        key = row['What is your Advent of Code Username? (Make sure you are logged in to see it!)']
        jsondata[key] = row

    csvfile.close()

# Open a json writer, and use the json.dump()
with open('./users_roch.json', 'w', encoding='utf-8') as jsonf:
    json.dump(jsondata, jsonf, indent=2)
    jsonf.close()
