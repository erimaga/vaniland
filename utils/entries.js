const fss = require('fs');
const path = require('path');

const files = fss.readdirSync(path.resolve(__dirname, '../assets/js'));

const entries = {};

files.forEach((file) => {
  const key = file.replace(/\.js$/, '');

  Object.defineProperty(entries, key, {
    value: path.resolve(__dirname, `../assets/js/${file}`),
    writable: true,
    enumerable: true,
    configurable: true,
  });
});

module.exports = entries;
