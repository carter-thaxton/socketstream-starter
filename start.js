var http = require('http'),
    ss   = require('socketstream');

// Declare port and apps
var port = 3000;
var apps = ['main'];

// Client-side formatters
ss.client.formatters.add(require('ss-coffee'));
ss.client.formatters.add(require('ss-stylus'));

// Server-side templates
ss.client.templateEngine.use(require('ss-hogan'));

// Define and serve the apps
for (var i = 0; i < apps.length; i += 1) {
  var app_name = apps[i];
  var app = require('./apps/' + app_name);
  ss.client.define(app.name, app);
  ss.http.route(app.route, function(req, res) {
    res.serveClient(app.name);
  });
}

// Minimize and pack assets if you type: SS_ENV=production node start.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(port);

// Start SocketStream
ss.start(server);
