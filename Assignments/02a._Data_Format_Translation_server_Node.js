const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const xmlParse = require('fast-xml-parser');
const csv = require('csv-parser');
const app = express();

// YAML file Endpoint
app.get('/yaml', (req, res) => {
  const yamlContent = fs.readFileSync('../02._Data_Files/me.yaml', 'utf-8');
  const parsedYaml = yaml.load(yamlContent);
  res.json(parsedYaml);
});

// TeXT file Endpoint
app.get('/text', (req, res) => {
  const txtContent = fs.readFileSync('../02._Data_Files/me.text', 'utf-8');
  res.send(txtContent);
});

// JSON file Endpoint
app.get('/json', (req, res) => {
  const jsonContent = fs.readFileSync('../02._Data_Files/me.json', 'utf-8');
  const parsedJson = JSON.parse(jsonContent);
  res.json(parsedJson);
});

// XML file Endpoint
app.get('/xml', (req, res) => {
    const xmlContent = fs.readFileSync('../02._Data_Files/me.xml', 'utf-8');
    const parser = new xmlParse.XMLParser();
    const parsedXml = parser.parse(xmlContent);
    res.json(parsedXml);
  });
  
  // CSV file Endpoint
  app.get('/csv', (req, res) => {
    const itemsFromCSV = [];
    fs.createReadStream('../02._Data_Files/me.csv')
      .pipe(csv())
      .on('data', (row) => {
        itemsFromCSV.push(row);
      })
      .on('end', () => {
        res.json(itemsFromCSV);
      });
  });

// localhost:5000/x
app.listen(process.env.PORT || "5000", () => {
    console.log("The Server is running", 5000);
});

