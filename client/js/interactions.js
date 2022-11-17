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
    if (game.stateFightRequests === 'Yes'){
        let targetId = this.getAttribute('playerId');
        socket.emit('callTarget', targetId);
    }
})
//#endregion

//#region -- NAVBAR
$(document).on('click', '#showViewOptions', function(){
    let viewOptionsClasslist = document.querySelector('#viewOptions').classList;
    viewOptionsClasslist.contains('hidden') ? viewOptionsClasslist.remove('hidden') : viewOptionsClasslist.add('hidden');
})
//#endregion

//#region -- OPTIONS
$(document).on('click', '#resetLocalStorage', function(){
    resetLocalStorage();
    window.location.reload();
})

$(document).on('click', '#switchFightRequests', () => {
    if  (game.stateFightRequests === 'Yes'){
        game.stateFightRequests = 'No';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = true;
        })
        socket.emit('disableFight');
    }
    else{
        game.stateFightRequests = 'Yes';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = false;
        })
        socket.emit('enableFight');
    }
    updateGameInformations();
})
//#endregion

$(document).on('click', '#trainForce', () => {
    game.currentExpForce += (1+player.expBonus);
    if (game.currentExpForce >= game.neededExpForce){
        game.currentExpForce = 0;
        calcExpNeededForce();

        player.force++;
        calcForceStats();
        calcPlayerIlvl();
        
        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
    }
    updateGameInformations();
})

$(document).on('click', '#trainVigour', () => {
    game.currentExpVigour += (1+player.expBonus);
    if (game.currentExpVigour >= game.neededExpVigour){
        game.currentExpVigour = 0;
        calcExpNeededVigour();

        player.vigour++;
        calcVigourStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
    }
    updateGameInformations();
})

$(document).on('click', '#trainAgility', () => {
    game.currentExpAgility += (1+player.expBonus);
    if (game.currentExpAgility >= game.neededExpAgility){
        game.currentExpAgility = 0;
        calcExpNeededAgility();

        player.agility++;
        calcAgilityStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
    }
    updateGameInformations();
})

$(document).on('click', '#trainWisdom', () => {
    game.currentExpWisdom += (1+player.expBonus);
    if (game.currentExpWisdom >= game.neededExpWisdom){
        game.currentExpWisdom = 0;
        calcExpNeededWisdom();

        player.wisdom++;
        calcWisdomStats();
        calcPlayerIlvl();

        setLSPlayer(player);
        setLSGame(game);
        updatePlayerInformations();
    }
    updateGameInformations();
})

function resetDialogWindow(){
    dialogFight.close();
    $(document).off('click', '#acceptFight');
    $(document).off('click', '#declineFight');
}

$(document).mouseup(function(e) 
{
    let viewOption = $("#viewOptions");
    let buttonOption = $('#showViewOptions');
    let viewOptionButtons = $("#viewOptions button");
    let viewOptionInputs = $("#viewOptions input");

    if (!viewOption.is(e.target) && 
    !buttonOption.is(e.target) &&
    !viewOptionButtons.is(e.target) &&
    !viewOptionInputs.is(e.target)) {
        viewOption.addClass('hidden');
    }
});

function calcPercentage(remainValue, maxValue){
    return (remainValue*100)/maxValue;
}
