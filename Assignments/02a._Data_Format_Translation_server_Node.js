const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const xmlParse = require('fast-xml-parser');
const csv = require('csv-parser');
const http = require('http');

const app = express();

// Define Server B URL
const SERVER_B_URL = "http://0.0.0.0:3001";

// Function to fetch data from Server B
function fetchDataFromServerB(path) {
  return new Promise((resolve, reject) => {
    http.get(`${SERVER_B_URL}${path}`, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// YAML file Endpoint
app.get('/yaml', async (req, res) => {
  try {
    const yamlContent = fs.readFileSync('../02._Data_Files/me.yaml', 'utf-8');
    const parsedYaml = yaml.load(yamlContent);
    res.json(parsedYaml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YAML data" });
  }
});

// TeXT file Endpoint
app.get('/text', async (req, res) => {
  try {
    const txtContent = fs.readFileSync('../02._Data_Files/me.text', 'utf-8');
    res.send(txtContent);
  } catch (error) {
    res.status(500).send("Failed to fetch TXT data");
  }
});

// JSON file Endpoint
app.get('/json', async (req, res) => {
  try {
    const jsonContent = fs.readFileSync('../02._Data_Files/me.json', 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    res.json(parsedJson);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch JSON data" });
  }
});

// XML file Endpoint
app.get('/xml', async (req, res) => {
  try {
    const xmlContent = fs.readFileSync('../02._Data_Files/me.xml', 'utf-8');
    const parser = new xmlParse.XMLParser();
    const parsedXml = parser.parse(xmlContent);
    res.json(parsedXml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch XML data" });
  }
});

// CSV file Endpoint
app.get('/csv', async (req, res) => {
  try {
    const itemsFromCSV = [];
    fs.createReadStream('../02._Data_Files/me.csv')
      .pipe(csv())
      .on('data', (row) => {
        itemsFromCSV.push(row);
      })
      .on('end', () => {
        res.json(itemsFromCSV);
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CSV data" });
  }
});

// Route to act as a client for Server B
app.get('/from-server-b', async (req, res) => {
  try {
    const data = await fetchDataFromServerB('/data-from-server-a');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Server B" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});
