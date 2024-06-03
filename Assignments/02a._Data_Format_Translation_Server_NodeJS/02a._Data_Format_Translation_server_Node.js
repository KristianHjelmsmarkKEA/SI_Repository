const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const xmlParser = require('fast-xml-parser');
const csv = require('csv-parser');
const path = require('path');
const axios = require('axios');

const app = express();

// Define Server B URL
const SERVER_B_URL = "http://localhost:8000";

// Fetch data from Server B
async function fetchDataFromServerB(endpoint) {
  try {
    const response = await axios.get(`${SERVER_B_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from Server B');
  }
}

// YAML file Endpoint
app.get('/yaml', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../01._Data_Files/me.yaml');
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const yamlContent = fs.readFileSync(filePath, 'utf-8');
    const parsedYaml = yaml.load(yamlContent);
    res.json(parsedYaml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YAML data" });
  }
});

// Text file Endpoint
app.get('/text', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../01._Data_Files/me.txt');
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const txtContent = fs.readFileSync(filePath, 'utf-8');
    res.send(txtContent);
  } catch (error) {
    res.status(500).send("Failed to fetch TXT data");
  }
});

// JSON file Endpoint
app.get('/json', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../01._Data_Files/me.json');
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const jsonContent = fs.readFileSync(filePath, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    res.json(parsedJson);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch JSON data" });
  }
});

// XML file Endpoint
app.get('/xml', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../01._Data_Files/me.xml');
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const xmlContent = fs.readFileSync(filePath, 'utf-8');
    const parsedXml = xmlParser.parse(xmlContent);
    res.json(parsedXml);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch XML data" });
  }
});

// CSV file Endpoint
app.get('/csv', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../01._Data_Files/me.csv');
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const itemsFromCSV = [];
    fs.createReadStream(filePath)
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

// Proxy endpoint to fetch data from Server B
app.get('/from-server-b/*', async (req, res) => {
  try {
    const endpoint = req.params[0];
    const data = await fetchDataFromServerB(`/${endpoint}`);
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
