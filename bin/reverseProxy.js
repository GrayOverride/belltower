var express = require('express');
var proxyServer = express();
var ip = require('ip');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const ipc = require('electron').ipcMain;

proxyServer.all("/", function (req, res, proxyTarget) {
  apiProxy.web(req, res, { target: proxyTarget });
});


////////////////
let mainServer;
function startServer(event, arg) {
  var currentIp = ip.address();
  arg.targetIn = "http://localhost:"+arg.targetIn;
    mainServer = proxyServer.listen(parseInt(arg.targetOut), '0.0.0.0',arg.targetIn, function () {
      event.sender.send('asynchronous-reply', 'Server proxy active: ['+arg.targetIn+" >> "+currentIp+":"+arg.targetOut + "]")
    });
}

function stopServer(event, arg){
  mainServer.close();
  event.sender.send('asynchronous-reply', 'Proxy stoping')
}

ipc.on('startServer', function (event, arg) {
  startServer(event, arg);
});

ipc.on('stopServer', function(event, arg){
  stopServer(event, arg);
});