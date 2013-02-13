var main = {
  name: 'main',
  route: '/',
  view: 'main.html',
  css:  ['libs', 'main.styl'],
  code: ['libs', 'main'],
  tmpl: '*'
};

module.exports = {
  formatters: [require('ss-coffee'), require('ss-stylus')],
  templateEngines: [require('ss-hogan')],
  port: 3000,
  apps: [main]
}
