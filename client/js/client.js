const socket = io();

socket.on('connect', () => {
    if(!getLSPlayer()){
        firstConnection();
    }
    else{
        player = getLSPlayer();
        socket.emit('playerConnection', player);
    }
    updateAllInformations();
    player.states.jobbing = null;
    // if (!player.hasOwnProperty('resetAlert') || player.states.resetAlert === 0){
    //     toaster('PLAYER OBJECT HAS CHANGED! PLEASE RESET LOCALSTORAGE!', 'alert', 20000)
    //     player.states.resetAlert = 1;
    //     setLSPlayer(player);
    // }
})

socket.on('updateConnectedPlayerListForClients', playerList => {
    document.querySelector('#numberOfPlayer').textContent = Object.keys(playerList).length;
    
    document.querySelectorAll('#connectedPlayerList button').forEach((button) => {
        button.remove();
    });

    for (const [key, member] of Object.entries(playerList)) {
        if (socket.id !== key){
            let memberButton = document.querySelector('#memberButton').cloneNode(true);
            memberButton.setAttribute('playerId', key);
            memberButton.querySelector('#memberName').textContent = member.general.name;
            memberButton.querySelector('#memberLvls').textContent = 'iLvl: ' + member.general.ilvl + ' | Jobs: ' + member.general.joblvl;
            memberButton.querySelector('[name="memberHP"]').textContent = 'HP: ' + member.fight.hpMax;
            memberButton.querySelector('[name="memberMP"]').textContent = 'MP: ' + member.fight.mpMax;
            memberButton.querySelector('[name="memberForce"]').textContent = 'Force: ' + member.fight.force;
            memberButton.querySelector('[name="memberVigour"]').textContent = 'Vigour: ' + member.fight.vigour;
            memberButton.querySelector('[name="memberAgility"]').textContent = 'Agility: ' + member.fight.agility;
            memberButton.querySelector('[name="memberWisdom"]').textContent = 'Wisdom: ' + member.fight.wisdom;
            memberButton.querySelector('[name="memberWoodcutting"]').textContent = 'Woodcutting: ' + member.job.woodcutting.lvl;
            memberButton.querySelector('[name="memberMining"]').textContent = 'Mining: ' + member.job.mining.lvl;
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
    if (player.general.stateFightRequests === 'Yes'){
        let dialogFight = document.querySelector('#dialogFight');  
    
        dialogFight.querySelector('#callerPlayerName').textContent = caller.callerObject.general.name;
        dialogFight.show();

        socket.emit('disableFight');
    
        $(document).on('click', '#acceptFight', function() {
            stopJobs();
            socket.emit('fightResponseTrue', caller.callerId);
            resetDialogWindow();
            socket.emit('enableFight');
        })
    
        $(document).on('click', '#declineFight', function() {
            socket.emit('fightResponseFalse', caller.callerId);
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

socket.on('sendFightResponseTrue', combatresult => {
    document.querySelector('#winnerName').textContent = combatresult.winner;
    document.querySelector('#winner').classList.remove('hidden');

    combatresult.combatlog.forEach((row) => {
        span = document.createElement('span')
        span.textContent = row
        document.querySelector('#combatlog').appendChild(span)
    })

    document.querySelector('#dialogFightResponses').show();
    $('#ok').off().on('click', function() {
        document.querySelector('#dialogFightResponses').close();
        document.querySelector('#winner').classList.add('hidden');
        document.querySelector('#combatlog').innerHTML = ''
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
