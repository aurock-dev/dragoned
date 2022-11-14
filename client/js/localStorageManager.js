/**
 * On first player connection, ask for a name and save player object to local storage
 *
 */
function firstConnection(){
    dialogChangeName.show();
    $(document).on('click', '#validateFirstName', function(){
        let playerName = document.querySelector('#inputFirstName').value;
        if (checkInput(playerName)){
            player.name = playerName;
            setLSPlayer(player);
            setLSGame(game);
            dialogChangeName.close();
            window.location.reload();
        }
        else{
            document.querySelector('#errorMessage').classList.remove('hidden');
        }
    })
}

/**
 * Store player object in local storage
 *
 * @param {*} player object
 */
function setLSPlayer(player){
    localStorage.setItem('player', JSON.stringify(player));
}

/**
 * Return player object from local storage
 *
 * 
 */
function getLSPlayer(){
    return JSON.parse(localStorage.getItem('player'));
}

/**
 * Store game object in local storage
 *
 * @param {*} game object
 */
function setLSGame(game){
    localStorage.setItem('game', JSON.stringify(game));
}

/**
 * Return game object from local storage
 *
 * 
 */
function getLSGame(){
    return JSON.parse(localStorage.getItem('game'));
}

/**
 * Clear local storage in needed
 *
 */
function resetLocalStorage(){
    localStorage.clear();
}