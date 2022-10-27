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
var memberList = {}

io.on('connection', socket => {
  // memberList[socket.id] = '';
  // socket.broadcast.emit('updateMemberListForClients', memberList);

  socket.on('playerConnection', playerInfos => {
    if (!memberList.hasOwnProperty(playerInfos.playerId)){
      memberList[playerInfos.playerId] = playerInfos.playerName;
    }
    console.log(memberList)
  });

  socket.on('playerDisconnection', playerInfos => {
    if (!memberList.hasOwnProperty(playerInfos.playerId)){
      memberList[playerInfos.playerId] = playerInfos.playerName;
    }
    console.log(memberList)
  });

  // socket.on('disconnect', () => {
  //   delete memberList[socket.id];
  //   io.emit('updateMemberListForClients', memberList);
  // });

  // socket.on('updateMemberList', () => {
  //   io.emit('updateMemberListForClients', memberList);
  // });

  // socket.on('updateClientName', player => {
  //   memberList[player.id] = player.playerName;
  //   io.emit('updateMemberListForClients', memberList);
  //   socket.to(player.id).emit('getclient', memberList);
  // });

  // socket.on('sendFight', ids => {
  //   let senderId =  ids.senderId;
  //   let senderName = memberList[senderId];
  //   let receiverId =  ids.receiverId;
  //   socket.to(receiverId).emit('sendFightRequest', {
  //     senderId:senderId, 
  //     receiverId:receiverId, 
  //     senderName:senderName
  //   });
  // })

  // socket.on('responseFightRequest', msg => {
  //   socket.to(msg.playerId).emit('response', msg.text);
  // })
});