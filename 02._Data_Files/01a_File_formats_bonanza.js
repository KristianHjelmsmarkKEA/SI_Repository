const fs = require('fs');
const yaml = require('js-yaml');
//const xml2js = require('xml2js');
const xmlParse = require('fast-xml-parser');
const csv = require('csv-parser');

//Text file read
const textContent = fs.readFileSync('./me.text', 'utf-8');
const itemsFromText = textContent.split('\n').map(item => item.trim());
console.log('Text File Content:', itemsFromText);

//json file read
const jsonContent = fs.readFileSync('./me.json', 'utf-8');
const itemsFromJSON = JSON.parse(jsonContent);
console.log('JSON File Content:', itemsFromJSON);

//yaml file read
const yamlContent = fs.readFileSync('./me.yaml', 'utf-8');
const itemsFromYAML = yaml.load(yamlContent);
console.log('YAML File Content:', itemsFromYAML);

//xml file read xml2js issues - xml-fast-parser used
const xmlContent = fs.readFileSync('./me.xml', 'utf-8');
const parser = new xmlParse.XMLParser();
const itemsFromXML = parser.parse(xmlContent);
console.log('XML File Content:', itemsFromXML);

//csv file read
const itemsFromCSV = [];
fs.createReadStream('./me.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Assuming 'name' is the column containing the items
    itemsFromCSV.push(row);
  })
  .on('end', () => {
    console.log('CSV File Content:', itemsFromCSV);
  });