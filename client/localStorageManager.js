function firstConnection(){
    dialogChangeName.show();
    $(document).on('click', '#validateFirstName', function(){
        let playerName = document.querySelector('#inputFirstName').value;
        player.name = playerName;
        setLSPlayer(player);
        dialogChangeName.close();
    })
}

function setLSPlayer(player){
    localStorage.setItem('player', JSON.stringify(player));
}

function getLSPlayer(){
    return JSON.parse(localStorage.getItem('player'));
}

function resetLocalStorage(){
    localStorage.clear();
}