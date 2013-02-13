var chat = {
  name: 'chat',
  route: '/',
  view: 'chat.html',
  css:  ['libs', 'chat.styl'],
  code: ['libs', 'chat'],
  tmpl: '*'
};

module.exports = {
  formatters: [
    require('ss-coffee'),
    require('ss-stylus')
  ],
  templateEngines: [
    require('ss-hogan')
  ],
  port: 3000,
  apps: [chat]
}
