import express from "express";
import bodyParser from "body-parser";
import fs from "fs";


const app = express();
app.use(bodyParser.json());
const endpointFilePath = "./webhook_endpoints.json";

// Function to read registered endpoints from file
function readEndpointsFromFile() {
    try {
      const data = fs.readFileSync(endpointFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
}

  // Function to write registered endpoints to file
function writeEndpointsToFile(endpoints) {
    fs.writeFileSync(endpointFilePath, JSON.stringify(endpoints, null, 2));
}

// All registered webhooks
let registeredWebhooks = readEndpointsFromFile();

// Register a webhook
app.post('/register', (req, res) => {
  const { url, eventType } = req.body;
  // validation
  if (!url || !eventType) {
    return res.status(400).json({ error: 'URL and eventType are required' });
  }
  // Webhook added to registeredWebhooks/jsonfile 
  registeredWebhooks.push({ url, eventType });
  writeEndpointsToFile(registeredWebhooks); // Write to webhook_endpoint.json
  return res.status(201).json({ message: 'Webhook registered successfully' });
});

// Unregister a webhook
app.post('/unregister', (req, res) => {
  const { url, eventType } = req.body;

  // Removing webhook from registeredWebhooks 
  registeredWebhooks = registeredWebhooks.filter(webhook =>
    webhook.url !== url || webhook.eventType !== eventType
  );
  writeEndpointsToFile(registeredWebhooks); // Write to webhook_endpoint.json
  return res.status(200).json({ message: 'Webhook unregistered successfully' });
});

// Ping all registered webhooks
app.get('/ping', (req, res) => {
  //logging all pinged webhooks
  const registeredWebhooks = readEndpointsFromFile();
  registeredWebhooks.forEach(webhook => {
    console.log(`Pinging webhook at ${webhook.url} for event ${webhook.eventType}`);
  });
  //const registeredWebhooks = readEndpointsFromFile();
  return res.status(200).json({ message: 'Pinged all registered webhooks', registeredWebhooks });
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));