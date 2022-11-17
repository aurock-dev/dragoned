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
        updateJobsInformations();
    }
})

socket.on('updateConnectedPlayerListForClients', playerList => {
    document.querySelector('#numberOfPlayer').textContent = Object.keys(playerList).length;

    let playerDiv = document.querySelector('#playerButton');
    playerDiv.textContent = 'You | iLvl : ' + playerList[socket.id].ilvl;

    document.querySelectorAll('#connectedPlayerList button').forEach((button) => {
        button.remove();
    });

    for (const [key, member] of Object.entries(playerList)) {
        if (socket.id !== key){
            let memberButton = document.querySelector('#memberButton').cloneNode(true);
            memberButton.setAttribute('playerId', key);
            memberButton.querySelector('#memberInfosShort').textContent = member.name + ' | iLvl : ' + member.ilvl;
            memberButton.querySelector('[name="memberHP"]').textContent = 'HP: ' + member.hpMax;
            memberButton.querySelector('[name="memberMP"]').textContent = 'MP: ' + member.mpMax;
            memberButton.querySelector('[name="memberForce"]').textContent = 'Force: ' + member.force;
            memberButton.querySelector('[name="memberVigour"]').textContent = 'Vigour: ' + member.vigour;
            memberButton.querySelector('[name="memberAgility"]').textContent = 'Agility: ' + member.agility;
            memberButton.querySelector('[name="memberWisdom"]').textContent = 'Wisdom: ' + member.wisdom;
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
    if (document.querySelector('[playerid="'+playerId+'"]')){
        document.querySelector('[playerid="'+playerId+'"]').disabled = true;
    }
})

socket.on('enableFightForClients', playerId => {
    if (document.querySelector('[playerid="'+playerId+'"]')){
        document.querySelector('[playerid="'+playerId+'"]').disabled = false;
    }
})
