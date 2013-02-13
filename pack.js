// You shouldn't need to modify this in your project.
// Put all app configurations in config.js

// Force repacking of assets
process.env['SS_ENV'] = 'production';
process.env['SS_PACK'] = '1';

var http   = require('http'),
    ss     = require('socketstream'),
    config = require('./config');

var i;

// Client-side formatters
if (config.formatters) {
  for (i=0; i < config.formatters.length; i += 1) {
    ss.client.formatters.add(config.formatters[i]);
  }
}

// Server-side templates
if (config.templateEngines) {
  for (i=0; i < config.templateEngines.length; i += 1) {
    ss.client.templateEngine.use(config.templateEngines[i]);
  }
}

// Define the apps
if (config.apps) {
  for (i = 0; i < config.apps.length; i += 1) {
    var app = config.apps[i];
    console.log('Defining app: \'' + app.name + '\'');
    ss.client.define(app.name, app);
  }
}

// Request repacking of assets
ss.client.packAssets();

// Start SocketStream with a dummy server, just so it will actually recreate assets, but don't listen.
// Pretty lame that SS won't include the transport assets without this.
var server = http.Server();
ss.start(server);

console.log('Successfully packed assets');
