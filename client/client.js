const socket = io();

let dialogChangeName = document.querySelector('#dialogNameChange');  
let dialogFight = document.querySelector('#dialogFight');  

socket.on('connect', () => {
    if(!getLSPlayerName()){
        firstConnection(socket.id)
    }
    else{
        socket.emit('playerConnection', getLSPlayerName());
    }
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

$(document).on('click', '#showDialogChangeName', function(){
    dialogChangeName.show();
})
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    setLSPlayerName(playerName)
    socket.emit('updateClientName', getLSPlayerName());
    dialogChangeName.close();
})
$(document).on('click', '#cancelChangeName', function(){
    dialogChangeName.close();
})

$(document).on('click', '[name="targetPlayer"]', function() {
    let senderId = socket.id;
    let receiverId = this.getAttribute('playerId');
    socket.emit('callTarget', {senderId:senderId, receiverId:receiverId});
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
