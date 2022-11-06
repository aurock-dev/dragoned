const socket = io();

socket.on('connect', () => {
    if(!getLSPlayerName()){
        firstConnection()
    }
    else{
        socket.emit('playerConnection', getLSPlayerName());
        document.querySelector('#inputChangeName').value = getLSPlayerName();
        document.querySelector('#currentPlayerName').textContent = getLSPlayerName();
        document.querySelector('#forceAmount').textContent = getLSPlayerForce();
        document.querySelector('#vigourAmount').textContent = getLSPlayerVigour();
        document.querySelector('#agilityAmount').textContent = getLSPlayerAgility();
        document.querySelector('#wisdomAmount').textContent = getLSPlayerWisdom();
    }
})

socket.on('updateConnectedPlayerListForClients', list => {
    document.querySelector('#connectedPlayerList').innerHTML = '';
    for (const [key, value] of Object.entries(list)) {
        if (socket.id !== key){
            let memberButton = document.createElement('button');
            memberButton.setAttribute('playerId', key); 
            memberButton.textContent = value;
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
