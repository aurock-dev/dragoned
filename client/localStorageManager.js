function getLSPlayerId(){
    return localStorage.getItem('playerId')
}

function setLSPlayerId(playerId){
    localStorage.setItem('playerId', playerId)
}

function getLSPlayerName(){
    return localStorage.getItem('playerName')
}

function setLSPlayerName(playerName){
    localStorage.setItem('playerName', playerName)
}

function firstConnection(socketId){
    dialogChangeName.show();
    $(document).on('click', '#validateChangeName', function(){
        let playerName = document.querySelector('#inputChangeName').value;
        setLSPlayerName(playerName);
        setLSPlayerId(socketId);
        let playerInfos = {
            playerName: getLSPlayerName(),
            id: getLSPlayerId()
        }
        dialogChangeName.close();
    })
}