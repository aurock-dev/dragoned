const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}`;
app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(`${clientPath}/index.html`);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const io = socketio(server);
var connectedPlayerList = {}

io.on('connection', socket => {
  socket.on('playerConnection', playerName => {
    if (!connectedPlayerList.hasOwnProperty(socket.id)){
      console.log('Player '+playerName+' connected.')
      connectedPlayerList[socket.id] = playerName;
    }
    console.log(connectedPlayerList)
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
    io.emit('updateConnectionState', true);
  });

  socket.on('disconnect', () => {
    console.log('Player '+connectedPlayerList[socket.id]+' disconnected.')
    delete connectedPlayerList[socket.id]
  });

  socket.on('updateConnectedPlayerList', () => {
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  });

  socket.on('updateClientName', playerName => {
    connectedPlayerList[socket.id] = playerName;
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  });

  socket.on('callTarget', ids => {
    let senderId =  ids.senderId;
    let senderName = connectedPlayerList[senderId];
    let receiverId =  ids.receiverId;
    socket.to(receiverId).emit('sendFightRequestToTarget', {
      senderId:senderId, 
      senderName:senderName
    });
  })

  socket.on('responseFightRequestToCaller', targetResponse => {
    socket.to(targetResponse.playerId).emit('sendResponse', targetResponse.text);
  })
});