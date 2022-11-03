const socket = io();

socket.on('connect', () => {
    if(!getLSPlayerName()){
        firstConnection(socket.id)
    }
    else{
        socket.emit('playerConnection', getLSPlayerName());
    }
    document.querySelector('#inputChangeName').value = getLSPlayerName();
    document.querySelector('#currentPlayerName').textContent = getLSPlayerName();
})

socket.on('updateMemberListForClients', list => {
    document.querySelector('#memberList').innerHTML = '';
    for (const [key, value] of Object.entries(list)) {
        if (socket.id !== key){
            let memberButton = document.createElement('button');
            memberButton.setAttribute('playerId', key); 
            memberButton.textContent = value;
            memberButton.name = "targetPlayer";
            document.querySelector('#memberList').appendChild(memberButton);
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
