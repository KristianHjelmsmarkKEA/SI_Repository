const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const open = require('open');

const app = express();
const port = 3000;

// Load client secret from a file
const CLIENT_SECRET_FILE = path.join(__dirname, 'client_secret.json');
const SCOPES = ['openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

let client_id = '';
let client_secret = '';

// Read client secret file
fs.readFile(CLIENT_SECRET_FILE, (err, content) => {
  if (err) return console.error('Error loading client secret file:', err);
  const credentials = JSON.parse(content);
  client_id = credentials.web.client_id;
  client_secret = credentials.web.client_secret;
});

app.use(session({
  secret: '_5#y2L"F4Q8z\n\xec]/',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.send('Oauth example page');
});

app.get('/login', (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    `http://localhost:${port}/callback`
  );

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'select_account'
  });

  req.session.state = oauth2Client.credentials.state;
  req.session.oauth2Client = oauth2Client;
  res.redirect(authorizationUrl);
});

app.get('/callback', async (req, res) => {
  const oauth2Client = req.session.oauth2Client;
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    res.redirect('/index');
  } catch (err) {
    console.error('Error retrieving access token', err);
    res.status(500).send('Error retrieving access token');
  }
});

app.get('/index', (req, res) => {
  if (req.session.tokens) {
    res.send("This is the secret page");
  } else {
    res.send("You are not logged in!");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});