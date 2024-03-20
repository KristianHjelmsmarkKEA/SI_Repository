const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// Register a webhook as integrator on Abdi's "git-webhook"
app.post('/register-integrator-webhook', async (req, res) => {
  const { url, eventType } = req.body;

  // Validation
  if (!url || !eventType) {
    return res.status(400).json({ error: 'URL and eventType are required' });
  }

  try {
    const response = await axios.post('', {
      url,
      eventType
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error registering webhook:', error.message);
    return res.status(500).json({ error: 'Failed to register webhook' });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
