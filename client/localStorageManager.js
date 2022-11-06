/**
 * On first player connection, ask for a name and save player object to local storage
 *
 */
function firstConnection(){
    dialogChangeName.show();
    $(document).on('click', '#validateFirstName', function(){
        let playerName = document.querySelector('#inputFirstName').value;
        player.name = playerName;
        setLSPlayer(player);
        dialogChangeName.close();
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
 * Clear local storage in needed
 *
 */
function resetLocalStorage(){
    localStorage.clear();
}