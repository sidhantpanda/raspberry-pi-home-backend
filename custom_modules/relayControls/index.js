const Gpio = require('onoff').Gpio;
const async = require('async');
const config = require('./config');
const socketClient = require('./socketIO');

const GPIO_PINS = {};

const BUTTONS = config.getConfig();

for (let i = 0; i < BUTTONS.length; i++) {
  const button = BUTTONS[i];
  if (GPIO_PINS[button.id] == null) {
    GPIO_PINS[button.id] = new Gpio(button.pin, 'out');
  }

  GPIO_PINS[button.id].writeSync(button.status ? 0 : 1);
}

module.exports = {
  getStatus: () => {
    return new Promise((resolve, reject) => {
      // initialzationPromise.then(() => {
      const buttons = BUTTONS.map(button => {
        return {
          ...button,
          pin: undefined,
        }
      });
      resolve(buttons);
      // }).catch(err => {
      //   reject(err);
      // })
    })
  },

  setStatus: (buttonId, status) => {
    return new Promise((resolve, reject) => {
      BUTTONS.forEach((button, index) => {
        if (button.id === buttonId) {
          BUTTONS[index] = {
            ...button,
            status: status
          };
        }
      });
      config.saveConfig(BUTTONS);
      socketClient.clientPromise.then(client => {
        client.emit('button_update', { buttonData: BUTTONS });
      })
      // initialzationPromise.then(() => {
      if (GPIO_PINS[buttonId] != null) {
        const val = status ? 0 : 1;
        GPIO_PINS[buttonId].write(val, err => {
          resolve({
            id: buttonId,
            status: status
          });
        });
      }
      // }).catch(err => {
      //   reject(err);
      // });
    });
  }
}