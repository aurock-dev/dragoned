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
  socket.on('playerConnection', player => {
    if (typeof player.name === 'string' && typeof player.ilvl === 'number'){
      if (!connectedPlayerList.hasOwnProperty(socket.id)){
        connectedPlayerList[socket.id] = player;
      }
  
      io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
      io.emit('updateConnectionState', true);
    }
    else{
      io.emit('updateConnectionState', false);
    }
  });

  socket.on('disconnect', () => {
    delete connectedPlayerList[socket.id];
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  });

  socket.on('updateConnectedPlayerList', () => {
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  });

  socket.on('updateClientName', playerName => {
    connectedPlayerList[socket.id] = playerName;
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  });

  socket.on('ilvlUpdate', ilvl =>{
    connectedPlayerList[socket.id].ilvl = ilvl;
    io.emit('updateConnectedPlayerListForClients', connectedPlayerList);
  })

  socket.on('callTarget', targetId => {
    socket.to(targetId).emit('fightRequest', {
      playerName: connectedPlayerList[socket.id].name,
      playerId: socket.id
    });
  })

  socket.on('fightResponse', targetResponse => {
    if (targetResponse.response){
      console.log('oui')
    }
    else{
      console.log('non')
      socket.to(targetResponse.callerId).emit('sendFightResponse', 'non');
    }
  })
});