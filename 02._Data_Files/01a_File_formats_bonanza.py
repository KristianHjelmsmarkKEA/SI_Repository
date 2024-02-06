import xml.etree.ElementTree as ET
import yaml
import json
import csv

#Python read file
#Text file
with open('./me.text', 'r') as file:
    items_from_text = [line.strip() for line in file.readlines()]

print('Text File Content:', items_from_text)


#xml file read
tree = ET.parse('./me.xml')
root = tree.getroot()
data = {}
for child in root:
    if len(child) > 0:
        data[child.tag] = [grandchild.text for grandchild in child]
    else:
        data[child.tag] = child.text

print('XML File Content: ', data)

#yaml file read
with open('./me.yaml', 'r') as file:
    items_from_yaml = yaml.safe_load(file)

print('YAML File Content:', items_from_yaml)


#JSON file read
with open('./me.json', 'r') as file:
    items_from_json = json.load(file)

print('JSON File Content:', items_from_json)


#CSV file read
items_from_csv = []
with open('./me.csv', 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        items_from_csv.append(row)

print('CSV File Content:', items_from_csv)

