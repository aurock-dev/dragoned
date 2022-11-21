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
            setAllObject(player, game, jobs)
            dialogChangeName.close();
            window.location.reload();
            toaster('Name Validated!');
        }
        else{
            toaster('Name can contains 3 to 12 letters only!', 'alert');
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
 * Store jobs object in local storage
 *
 * @param {*} jobs object
 */
function setLSJobs(jobs){
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

/**
 * Return jobs object from local storage
 *
 * 
 */
function getLSJobs(){
    return JSON.parse(localStorage.getItem('jobs'));
}

/**
 * Clear local storage in needed
 *
 */
function resetLocalStorage(){
    localStorage.clear();
}

function getAllObject(){
    player = getLSPlayer();
    game = getLSGame();
    jobs = getLSJobs();
}

function setAllObject(player, game, jobs){
    setLSPlayer(player);
    setLSGame(game);
    setLSJobs(jobs);
}