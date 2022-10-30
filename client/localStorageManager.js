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

function getLSPlayerForce(){
    return localStorage.getItem('force')
}

function setLSPlayerForce(force){
    localStorage.setItem('force', force)
}

function getLSPlayerForce(){
    return localStorage.getItem('vigour')
}

function setLSPlayerForce(vigour){
    localStorage.setItem('vigour', vigour)
}

function getLSPlayerForce(){
    return localStorage.getItem('agility')
}

function setLSPlayerForce(agility){
    localStorage.setItem('agility', agility)
}