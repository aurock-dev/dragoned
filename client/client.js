const socket = io();

socket.on('connect', () => {
    if(!getLSPlayer()){
        firstConnection();
    }
    else{
        player = getLSPlayer();
        game = getLSGame();
        socket.emit('playerConnection', player);
        updatePlayerInformations();
        updateGameInformations();
    }
})

socket.on('updateConnectedPlayerListForClients', playerList => {
    document.querySelector('#connectedPlayerList').innerHTML = '';
    document.querySelector('#numberOfPlayer').textContent = Object.keys(playerList).length;

    let playerDiv = document.createElement('div');
    playerDiv.classList.add('noButton');
    playerDiv.textContent = playerList[socket.id].name + ' | iLvl : ' + playerList[socket.id].ilvl;
    document.querySelector('#connectedPlayerList').appendChild(playerDiv);

    for (const [key, value] of Object.entries(playerList)) {
        if (socket.id !== key){
            let memberButton = document.createElement('button');
            memberButton.setAttribute('playerId', key); 
            memberButton.textContent = value.name + ' | iLvl : ' + value.ilvl;
            memberButton.name = "targetPlayer";
            document.querySelector('#connectedPlayerList').appendChild(memberButton);
        }
    }
});

socket.on('updateConnectionState', state => {
    if (state){
        document.querySelector('#connectionState').textContent = 'Connected';
    }
    else{
        document.querySelector('#connectionState').textContent = 'Not Connected';
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
