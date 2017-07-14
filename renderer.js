// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
const startBtn = document.getElementById('startSrv')
const stopBtn = document.getElementById('stopSrv')

startBtn.addEventListener('click', function () {
  var payload = {}
  payload.targetIn = document.getElementById('targetIn').value;
  payload.targetOut = document.getElementById('targetOut').value;
  ipc.send('startServer',payload);
});

stopBtn.addEventListener('click', function(){
    ipc.send('stopServer')
});

ipc.on('asynchronous-reply', function (event, arg) {
  const message = `Status: ${arg}`
  document.getElementById('serverReply').innerHTML = message
})




