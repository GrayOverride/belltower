var express = require('express');
var proxyServer = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const ipc = require('electron').ipcMain

var proxyOne = 'http://localhost:8000';
proxyServer.all("/*", function (req, res) {
  apiProxy.web(req, res, { target: proxyOne });
});

////////////////
let mainServer;
function startServer(event, arg) {
    mainServer = proxyServer.listen(3000, '0.0.0.0', function () {
      event.sender.send('asynchronous-reply', 'Server Listening')
    });

}

function stopServer(event, arg){
  mainServer.close();
  event.sender.send('asynchronous-reply', 'Server stoping')
}

ipc.on('startServer', function (event, arg) {
  startServer(event, arg);
});

ipc.on('stopServer', function(event, arg){
  stopServer(event, arg);
});