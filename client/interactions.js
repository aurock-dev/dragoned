//#region -- DIALOG CHANGE NAME
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    if (checkInput(playerName)){        
        player.name = playerName;
        setLSPlayer(player);
        socket.emit('updateClientName', player.name);
        document.querySelector('#inputChangeName').value = player.name;
        document.querySelector('#currentPlayerName').textContent = player.name;
    }
    else{
        document.querySelector('#optionErrorMessage').classList.remove('hidden');
    }
})
//#endregion

//#region -- MEMBERS LIST
$(document).on('click', '[name="targetPlayer"]', function() {
    let targetId = this.getAttribute('playerId');
    socket.emit('callTarget', targetId);
})
//#endregion

//#region -- NAVBAR
$(document).on('click', '#showViewOptions', function(){
    let viewOptionsClasslist = document.querySelector('#viewOptions').classList;
    viewOptionsClasslist.contains('hidden') ? viewOptionsClasslist.remove('hidden') : viewOptionsClasslist.add('hidden');
})

$(document).on('click', '#showViewServer', function(){
    let viewServerClasslist = document.querySelector('#viewServer').classList;
    viewServerClasslist.contains('hidden') ? viewServerClasslist.remove('hidden') : viewServerClasslist.add('hidden');
})
//#endregion

//#region -- OPTIONS
$(document).on('click', '#resetLocalStorage', function(){
    resetLocalStorage();
    window.location.reload();
})
//#endregion

$(document).on('click', '#trainForce', () => {
    game.currentExpForce += (1+player.expBonus);
    if (game.currentExpForce >= game.neededExpForce){
        game.currentExpForce = 0;
        calcExpNeededForce();
        updateGameInformations();

        player.force++;
        calcForceStats();
        calcPlayerIlvl();
        
        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
        updateGameInformations();
    }
    document.querySelector('#currentExpForce').textContent =  game.currentExpForce;
})

$(document).on('click', '#trainVigour', () => {
    game.currentExpVigour += (1+player.expBonus);
    if (game.currentExpVigour >= game.neededExpVigour){
        game.currentExpVigour = 0;
        calcExpNeededVigour();
        updateGameInformations();

        player.vigour++;
        calcVigourStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
        updateGameInformations();
    }
    document.querySelector('#currentExpVigour').textContent =  game.currentExpVigour;
})

$(document).on('click', '#trainAgility', () => {
    game.currentExpAgility += (1+player.expBonus);
    if (game.currentExpAgility >= game.neededExpAgility){
        game.currentExpAgility = 0;
        calcExpNeededAgility();
        updateGameInformations();

        player.agility++;
        calcAgilityStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
        updateGameInformations();
    }
    document.querySelector('#currentExpAgility').textContent =  game.currentExpAgility;
})

$(document).on('click', '#trainWisdom', () => {
    game.currentExpWisdom += (1+player.expBonus);
    if (game.currentExpWisdom >= game.neededExpWisdom){
        game.currentExpWisdom = 0;
        calcExpNeededWisdom();
        updateGameInformations();

        player.wisdom++;
        calcWisdomStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
        updateGameInformations();
    }
    document.querySelector('#currentExpWisdom').textContent =  game.currentExpWisdom;
})