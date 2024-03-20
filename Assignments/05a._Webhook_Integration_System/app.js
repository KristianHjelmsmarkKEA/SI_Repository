import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import axios from "axios";
import request from "request";

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
/*
app.get('/ping', (req, res) => {
  const registeredWebhooks = readEndpointsFromFile();

  headers = {'Content-Type': 'application/json'}
  payload = {"date": datetime.now(), "payment_recived": ("succes")}
    
  json_payload = json.dumps(payload)

  registeredWebhooks.forEach(webhook => {
    request({
        url: webhook.url,
        method: "POST",
        json: true,   
        headers,
        body: payload
    }, function (error, response, body){
        console.log(response);
    });
  });
  
  return res.status(200).json({ message: 'Pinged all registered webhooks', registeredWebhooks });
});
*/


// Route to ping all registered webhooks
app.get('/ping', async (req, res) => {
    // Read registered endpoints from file
    const registeredWebhooks = readEndpointsFromFile();
  
    // Send POST requests to all registered webhooks
    try {
      const pingPromises = registeredWebhooks.map(async webhook => {
        try {
          const response = await axios.post(webhook.url, { eventType: webhook.eventType });
          console.log(`Ping successful for ${webhook.url}: ${response.status}`);
          return `${webhook.url}: ${response.status}`;
        } catch (error) {
          console.error(`Error pinging ${webhook.url}: ${error.message}`);
          return `${webhook.url}: Error - ${error.message}`;
        }
      });
  
      const pingResults = await Promise.all(pingPromises);
      return res.status(200).json({ message: 'Pinged all registered webhooks', pingResults });
    } catch (error) {
      console.error('Error pinging webhooks:', error.message);
      return res.status(500).json({ error: 'Failed to ping webhooks' });
    }
  });

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));