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
        dialogChangeName.close();
    })
}