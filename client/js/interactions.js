//#region -- DIALOG CHANGE NAME
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    if (checkInput(playerName)){
        if (playerName !== player.name){
            player.name = playerName;
            setLSPlayer(player);
            socket.emit('updateClientName', player.name);
            document.querySelector('#inputChangeName').value = player.name;
            document.querySelector('#currentPlayerName').textContent = player.name;
            document.querySelector('#validateChangeName').disabled = true;
            toaster('Name changed!');
        }
        else{
            toaster('Name must be different!', 'alert');
        }
    }
    else{
        toaster('Name can contains 3 to 12 letters only!', 'alert');
    }
})

$(document).on('input', '#inputChangeName', function(){
    document.querySelector('#validateChangeName').disabled = false;
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
    toaster('Local storage has been reset!', 'alert');
})

$(document).on('click', '#switchFightRequests', () => {
    if  (game.stateFightRequests === 'Yes'){
        game.stateFightRequests = 'No';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = true;
        })
        socket.emit('disableFight');
        toaster('Fights has been disallow!');
    }
    else{
        game.stateFightRequests = 'Yes';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = false;
        })
        socket.emit('enableFight');
        toaster('Fights has been allow!');
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
        updatePlayerInformations();
    }
    updateGameInformations();
    setLSGame(game);
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
        updatePlayerInformations();
    }
    updateGameInformations();
    setLSGame(game);
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
        updatePlayerInformations();
    }
    updateGameInformations();
    setLSGame(game);
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
        updatePlayerInformations();
    }
    updateGameInformations();
    setLSGame(game);
})

$(document).on('click', '#woodcutting', () => {
    jobs.currentJobWoodcutting += 1;
    if (jobs.currentJobWoodcutting >= jobs.neededJobWoodcutting){
        jobs.currentJobWoodcutting = 0;
    }
    updateJobsInformations();
    calcWoodcuttingLoot();
})

$(document).on('click', '#mining', () => {
    jobs.currentJobMining += 1;
    if (jobs.currentJobMining >= jobs.neededJobMining){
        jobs.currentJobMining = 0;
    }
    updateJobsInformations();
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
