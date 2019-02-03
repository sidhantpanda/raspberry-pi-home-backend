// const Gpio = require('onoff').Gpio;
const async = require('async');
const config = require('./config');
// const socketClient = require('./socketIO');

const GPIO_PINS = {};

const BUTTONS = config.getConfig();

BUTTONS.forEach(button => {
  if (GPIO_PINS[button.id] == null) {
    // GPIO_PINS[button.id] = new Gpio(button.pin, 'out');
  }

  // TODO uncomment this
  // GPIO_PINS[button.id].writeSync(button.status ? 0 : 1);
});

module.exports = {
  getStatus: () => {
    return new Promise((resolve, reject) => {
      const buttons = BUTTONS.map(button => {
        return {
          ...button,
          pin: undefined,
        }
      });
      resolve(buttons);
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
      if (GPIO_PINS[buttonId] != null) {
        const val = status ? 0 : 1;
        // TODO uncomment this
        // GPIO_PINS[buttonId].write(val, err => {
        //   resolve({
        //     id: buttonId,
        //     status: status
        //   });
        // });


        // TODO remove mock resolve below
        resolve({
          id: buttonId,
          status: status
        });
      }
    });
  }
}