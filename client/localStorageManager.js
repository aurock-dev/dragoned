function getLSPlayerName(){
    return localStorage.getItem('playerName')
}

function setLSPlayerName(playerName){
    localStorage.setItem('playerName', playerName)
}

function firstConnection(){
    dialogChangeName.show();
    $(document).on('click', '#validateFirstName', function(){
        let playerName = document.querySelector('#inputFirstName').value;
        setLSPlayerName(playerName);
        setLSPlayerForce(1);
        setLSPlayerVigour(1);
        setLSPlayerAgility(1);
        setLSPlayerWisdom(1);
        document.querySelector('#inputChangeName').value = getLSPlayerName();
        document.querySelector('#currentPlayerName').textContent = getLSPlayerName();
        document.querySelector('#forceAmount').textContent = getLSPlayerForce();
        document.querySelector('#vigourAmount').textContent = getLSPlayerVigour();
        document.querySelector('#agilityAmount').textContent = getLSPlayerAgility();
        document.querySelector('#wisdomAmount').textContent = getLSPlayerWisdom();
        dialogChangeName.close();
    })
}

function getLSPlayerForce(){
    return localStorage.getItem('force')
}

function setLSPlayerForce(force){
    localStorage.setItem('force', force)
}

function getLSPlayerVigour(){
    return localStorage.getItem('vigour')
}

function setLSPlayerVigour(vigour){
    localStorage.setItem('vigour', vigour)
}

function getLSPlayerAgility(){
    return localStorage.getItem('agility')
}

function setLSPlayerAgility(agility){
    localStorage.setItem('agility', agility)
}

function getLSPlayerWisdom(){
    return localStorage.getItem('wisdom')
}

function setLSPlayerWisdom(wisdom){
    localStorage.setItem('wisdom', wisdom)
}