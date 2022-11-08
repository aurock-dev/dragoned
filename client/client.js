const socket = io();

socket.on('connect', () => {
    if(!getLSPlayer()){
        firstConnection();
    }
    else{
        player = getLSPlayer();
        socket.emit('playerConnection', player);
        updatePlayerInformations();
        updateGameInformations();
    }
})

socket.on('updateConnectedPlayerListForClients', infos => {
    document.querySelector('#connectedPlayerList').innerHTML = '';
    document.querySelector('#numberOfPlayer').textContent = infos.numberOfPlayer;

    let playerDiv = document.createElement('div');
    playerDiv.classList.add('noButton');
    playerDiv.textContent = infos.connectedPlayerList[socket.id] + ' | iLvl : ' + infos.playerIlvl;
    document.querySelector('#connectedPlayerList').appendChild(playerDiv);

    for (const [key, value] of Object.entries(infos.connectedPlayerList)) {
        if (socket.id !== key){
            let memberButton = document.createElement('button');
            memberButton.setAttribute('playerId', key); 
            memberButton.textContent = value + ' | iLvl : ' + infos.playerIlvl;
            memberButton.name = "targetPlayer";
            document.querySelector('#connectedPlayerList').appendChild(memberButton);
        }
    }
});

socket.on('updateConnectionState', state => {
    if (state){
        document.querySelector('#connectionState').textContent = 'Connected';
    }
})

socket.on('sendFightRequestToTarget', senderPlayer => {
    dialogFight.querySelector('#senderPlayerName').textContent = senderPlayer.senderName;
    dialogFight.show();

    $(document).on('click', '#acceptFight', function() {
        dialogFight.close();
        socket.emit('responseFightRequestToCaller', {playerId : senderPlayer.senderId, text : 'oui'});
    })
    $(document).on('click', '#declineFight', function() {
        dialogFight.close();
        socket.emit('responseFightRequestToCaller', {playerId : senderPlayer.senderId, text : 'non'});
    })
})

socket.on('sendResponse', response => {
    alert(response)
})
