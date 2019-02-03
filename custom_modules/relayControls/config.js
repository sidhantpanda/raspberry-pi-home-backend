const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');


const FILE_PATH = path.join(__dirname, '../../../buttons.json');

const DEFAULT_CONFIG = [
  {
    pin: 17,
    label: 'White Light',
    status: false,
    color: 'blue',
    id: 'button1',
    type: 'light'
  }, {
    pin: 4,
    label: 'Fan',
    status: false,
    color: 'green',
    id: 'button2',
    type: 'fan'
  }, {
    pin: 3,
    label: 'Yellow Light',
    status: false,
    color: 'yellow',
    id: 'button3',
    type: 'light',
  }
];


let BUTTONS = [];
if (!fs.existsSync(FILE_PATH)) {
  jsonfile.writeFileSync(FILE_PATH, DEFAULT_CONFIG);
  BUTTONS = DEFAULT_CONFIG;
} else {
  BUTTONS = jsonfile.readFileSync(FILE_PATH);
}

module.exports = {
  getConfig: () => BUTTONS,
  saveConfig: config => jsonfile.writeFileSync(FILE_PATH, config)
}
