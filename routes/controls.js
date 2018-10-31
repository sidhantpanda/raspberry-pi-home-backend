const express = require('express');
const router = express.Router();
const relayControls = require('../custom_modules/relayControls');
const async = require('async');

router.post('/status/:buttonId', (req, res) => {
  const { buttonId } = req.params;
  const { status } = req.body;

  console.log('button:', buttonId);
  console.log('status:', status);
  console.log('body:', req.body);

  if (buttonId === 'all' || buttonId === 'lights') {
    relayControls.getStatus().then(buttons => {
      async.forEach(buttons, (button, cb) => {
        if (buttonId === 'all' || (buttonId === 'lights' && button.type === 'light')) {
          relayControls.setStatus(button.id, status).then(buttonData => {
            cb();
          }).catch(err => {
            cb(err);
          });
        } else {
          cb();
        }
      }, err => {
        if (err) {
          console.error(err);
          res.status(500).send({
            error: 'Something went wrong'
          })
        } else {
          res.status(200).send();
        }
      });
    }).catch(err => {
      console.error('Error setting all to', status, err);
      res.status(500).send({
        error: 'Something went wrong'
      })
    });
  } else {
    relayControls.setStatus(buttonId, status).then(buttonData => {
      res.status(200).send({
        buttonData: buttonData
      });
    }).catch(err => {
      console.error('Error setting', buttonId, 'to', status, err);
      res.status(500).send({
        error: 'Something went wrong'
      })
    });
  }
});

router.get('/status', (req, res, next) => {
  // console.log('Received request for status');
  relayControls.getStatus().then(buttons => {
    res.status(200).send({
      buttons: buttons
    });
  }).catch(err => {
    res.status(500).send({
      error: 'Something went wrong'
    })
  });
});

module.exports = router;
