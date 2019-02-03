const express = require('express');
const router = express.Router();
const relayControls = require('../custom_modules/relayControls');
const async = require('async');

router.post('/status/:buttonId', async (req, res) => {
  const { buttonId } = req.params;
  const { status } = req.body;

  console.log('button:', buttonId);
  console.log('status:', status);
  console.log('body:', req.body);

  try {
    if (buttonId === 'all' || buttonId === 'lights') {
      const buttons = await relayControls.getStatus();
      buttons.forEach(async button => {
        if (buttonId === 'all' || (buttonId === 'lights' && button.type == 'light')) {
          await relayControls.setStatus(button.id, status);
        }
      });
      res.status(200).send();
    } else {
      console.log('ere')
      const buttonData = await relayControls.setStatus(buttonId, status);
      res.status(200).send({ buttonData });
    }

  } catch (err) {
    console.error('Error changing status: ', err);
    res.status(500).send({
      error: 'Something went wrong'
    })
  }
});

router.get('/status', async (req, res, next) => {
  console.log('header', req.headers.token);
  try {
    const buttons = await relayControls.getStatus();
    res.status(200).send({
      buttons: buttons
    });
  } catch (err) {
    console.error('Error setting status:', err);
    res.status(500).send({
      error: 'Something went wrong'
    })
  }
  // res.status(500).send('error')
});

module.exports = router;
