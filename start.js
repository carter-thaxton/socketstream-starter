// You shouldn't need to modify this in your project.
// Put all app configurations in config.js

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

// Define and serve the apps
if (config.apps) {
  for (i = 0; i < config.apps.length; i += 1) {
    var app = config.apps[i];
    console.log('Defining app: \'' + app.name + '\' at: \'' + app.route + '\'');
    ss.client.define(app.name, app);
    ss.http.route(app.route, function(req, res) {
      res.serveClient(app.name);
    });
  }
}

// Minimize and pack assets if you type: SS_ENV=production node start.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var port = config.port || 3000;
var server = http.Server(ss.http.middleware);
console.log('Starting ' + ss.env + ' server on port: ' + port);
server.listen(port);

// Start SocketStream
ss.start(server);
