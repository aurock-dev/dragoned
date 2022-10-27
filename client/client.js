const socket = io();

let dialogChangeName = document.querySelector('#dialogNameChange');  
let dialogFight = document.querySelector('#dialogFight');  

socket.on('connect', () => {
    if(!getLSPlayerId() && !getLSPlayerName()){
        firstConnection(socket.id)
    }
    else{
        let playerInfos = {
            playerName: getLSPlayerName(),
            playerId: getLSPlayerId()
        }
        socket.emit('playerConnection', playerInfos);
        // socket.emit('updateClientName', playerInfos);
    }
})

socket.on('disconnect', () => {
    let playerInfos = {
        playerName: getLSPlayerName(),
        playerId: getLSPlayerId()
    }
    socket.emit('playerDisconnection', playerInfos);
})

socket.on('updateMemberListForClients', list => {
    document.querySelector('#memberList').innerHTML = '';
    for (const [key, value] of Object.entries(list)) {
        let memberButton = document.createElement('button');
        if (value === ''){
            memberButton.textContent = key;
        }
        else{
            memberButton.textContent = value;
        }
        memberButton.setAttribute('playerId', key);
        memberButton.name = "targetPlayer";
        document.querySelector('#memberList').appendChild(memberButton);
    }
});

document.querySelector('#showDialogChangeName').onclick = () => {
    dialogChangeName.show();
}
document.querySelector('#validateChangeName').onclick = () => {
    let playerName = document.querySelector('#inputChangeName').value;
    localStorage.setItem('playerName', playerName);
    let playerInfos = {
        playerName: playerName,
        id: socket.id
    }
    socket.emit('updateClientName', playerInfos);
    dialogChangeName.close();
}

$(document).on('click', '[name="targetPlayer"]', function() {
    let senderId = socket.id;
    let receiverId = this.getAttribute('playerId');
    socket.emit('sendFight', {senderId:senderId, receiverId:receiverId});
})

socket.on('sendFightRequest', msg => {
    dialogFight.querySelector('#senderPlayerName').textContent = msg.senderName;
    dialogFight.show();
    $(document).on('click', '#acceptFight', function() {
        dialogFight.close();
        socket.emit('responseFightRequest', {playerId : msg.senderId, text : 'oui'});
    })
    
    $(document).on('click', '#declineFight', function() {
        dialogFight.close();
        socket.emit('responseFightRequest', {playerId : msg.senderId, text : 'non'});
    })
})

socket.on('response', msg => {
    alert(msg)
})
