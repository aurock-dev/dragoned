const socket = io();

socket.on('connect', () => {
    if(!getLSPlayer()){
        firstConnection();
    }
    else{
        player = getLSPlayer();
        console.log(player)
        socket.emit('playerConnection', player);
        updatePlayerInformations();
        updateGameInformations();
    }
})

socket.on('updateConnectedPlayerListForClients', list => {
    document.querySelector('#connectedPlayerList').innerHTML = '';
    for (const [key, value] of Object.entries(list.connectedPlayerList)) {
        if (socket.id !== key){
            let memberButton = document.createElement('button');
            memberButton.setAttribute('playerId', key); 
            memberButton.textContent = value + ' | iLvl : ' + list.playerIlvl;
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
