const express = require('express');
const router = express.Router();

const creds = require('/Users/sidhantpanda/.config/rasphome/credentials.json');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(creds.web.client_id);

const AccessToken = require('../models/AccessToken');
const User = require('../models/User');

const uuidv4 = require('uuid/v4');

async function getTokenDetails(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: creds.web.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  return ticket.getPayload();
}

router.post('/google/login', async function (req, res, next) {
  const details = await getTokenDetails(req.body.tokenId);
  if (details == null || details.email == null) {
    res.status(401).send({
      error: 'Could not login with Google. Invalid token'
    });
  } else {
    const { email, name, picture } = details;
    let user = await User.findOne({ email }).exec();
    if (user == null) {
      user = await User.create({ email, name, picture });
    }
    const token = uuidv4();
    await AccessToken.create({ email, token });

    res.status(200).send({
      user: { email, name, picture, token }
    });
  }
});

module.exports = router;
