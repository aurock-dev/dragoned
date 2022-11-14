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

socket.on('fightRequest', caller => {
    if (game.stateFightRequests === 'Yes'){
        let dialogFight = document.querySelector('#dialogFight');  
    
        dialogFight.querySelector('#callerPlayerName').textContent = caller.player.name;
        dialogFight.show();

        socket.emit('disableFight');
    
        $(document).on('click', '#acceptFight', function() {
            socket.emit('fightResponseTrue', caller.playerId);
            resetDialogWindow();
            socket.emit('enableFight');
        })
    
        $(document).on('click', '#declineFight', function() {
            socket.emit('fightResponseFalse', caller.playerId);
            resetDialogWindow();
            socket.emit('enableFight');
        })
    }
})

socket.on('sendFightResponseFalse', targetName => {
    document.querySelector('#fightTarget').textContent = targetName;
    document.querySelector('#refuse').classList.remove('hidden');
    document.querySelector('#dialogFightResponses').show();
    $('#ok').off().on('click', function() {
        document.querySelector('#dialogFightResponses').close();
        document.querySelector('#refuse').classList.add('hidden');
    })
})

socket.on('sendFightResponseTrue', winner => {
    document.querySelector('#winnerName').textContent = winner;
    document.querySelector('#winner').classList.remove('hidden');

    document.querySelector('#dialogFightResponses').show();
    $('#ok').off().on('click', function() {
        document.querySelector('#dialogFightResponses').close();
        document.querySelector('#winner').classList.add('hidden');
    })
})

socket.on('disableFightForClients', playerId => {
    document.querySelector('[playerid="'+playerId+'"]').disabled = true;
})

socket.on('enableFightForClients', playerId => {
    document.querySelector('[playerid="'+playerId+'"]').disabled = false;
})
