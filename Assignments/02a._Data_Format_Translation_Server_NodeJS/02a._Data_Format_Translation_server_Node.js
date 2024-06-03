const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const xmlParser = require('fast-xml-parser');
const csv = require('csv-parser');
const path = require('path');

const app = express();

// YAML file Endpoint
app.get('/yaml', async (req, res) => {
  try {
    const yamlContent = fs.readFileSync(path.join(__dirname, '../01._Data_Files/me.yaml'), 'utf-8');
    const parsedYaml = yaml.load(yamlContent);
    res.json(parsedYaml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YAML data" });
  }
});

// Text file Endpoint
app.get('/text', async (req, res) => {
  try {
    const txtContent = fs.readFileSync(path.join(__dirname, '../01._Data_Files/me.txt'), 'utf-8');
    res.send(txtContent);
  } catch (error) {
    res.status(500).send("Failed to fetch TXT data");
  }
});

// JSON file Endpoint
app.get('/json', async (req, res) => {
  try {
    const jsonContent = fs.readFileSync(path.join(__dirname, '../01._Data_Files/me.json'), 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    res.json(parsedJson);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch JSON data" });
  }
});

// XML file Endpoint
app.get('/xml', async (req, res) => {
  try {
    const xmlContent = fs.readFileSync(path.join(__dirname, '../01._Data_Files/me.xml'), 'utf-8');
    const parsedXml = xmlParser.parse(xmlContent);
    res.json(parsedXml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch XML data" });
  }
});

// CSV file Endpoint
app.get('/csv', async (req, res) => {
  try {
    const itemsFromCSV = [];
    fs.createReadStream(path.join(__dirname, '../01._Data_Files/me.csv'))
      .pipe(csv())
      .on('data', (row) => {
        itemsFromCSV.push(row);
      })
      .on('end', () => {
        res.json(itemsFromCSV);
      })
      .on('error', (error) => {
        res.status(500).json({ error: "Failed to fetch CSV data" });
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CSV data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
