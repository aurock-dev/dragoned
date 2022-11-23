//#region -- DIALOG CHANGE NAME
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    if (checkInput(playerName)){
        if (playerName !== player.general.name){
            player.general.name = playerName;
            setLSPlayer(player);
            socket.emit('updateClientName', player.general.name);
            document.querySelector('#inputChangeName').value = player.general.name;
            document.querySelector('#currentPlayerName').textContent = player.general.name;
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
    if (player.general.stateFightRequests === 'Yes'){
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
    if  (player.general.stateFightRequests === 'Yes'){
        player.general.stateFightRequests = 'No';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = true;
        })
        socket.emit('disableFight');
        toaster('Fights has been disallow!');
    }
    else{
        player.general.stateFightRequests = 'Yes';
        document.querySelectorAll('#connectedPlayerList button').forEach( (button) => {
            button.disabled = false;
        })
        socket.emit('enableFight');
        toaster('Fights has been allow!');
    }
    updatePlayerGeneralInfos();
})
//#endregion

$(document).on('click', '#trainForce', () => {
    player.fightExp.force.current += (1+player.fight.expBonus);
    if (player.fightExp.force.current >= player.fightExp.force.needed){
        player.fightExp.force.current = 0;
        calcExpNeededForce();

        player.fight.force++;
        calcForceStats();
        calcPlayerIlvl();
    }
    setLSPlayer(player);
    updateAllInformations();
})

$(document).on('click', '#trainVigour', () => {
    player.fightExp.vigour.current += (1+player.fight.expBonus);
    if (player.fightExp.vigour.current >= player.fightExp.vigour.needed){
        player.fightExp.vigour.current = 0;
        calcExpNeededVigour();

        player.fight.vigour++;
        calcVigourStats();
        calcPlayerIlvl();
    }
    setLSPlayer(player);
    updateAllInformations();
})

$(document).on('click', '#trainAgility', () => {
    player.fightExp.agility.current += (1+player.fight.expBonus);
    if (player.fightExp.agility.current >= player.fightExp.agility.needed){
        player.fightExp.agility.current = 0;
        calcExpNeededAgility();

        player.fight.agility++;
        calcAgilityStats();
        calcPlayerIlvl();
    }
    setLSPlayer(player);
    updateAllInformations();
})

$(document).on('click', '#trainWisdom', () => {
    player.fightExp.wisdom.current += (1+player.fight.expBonus);
    if (player.fightExp.wisdom.current >= player.fightExp.wisdom.needed){
        player.fightExp.wisdom.current = 0;
        calcExpNeededWisdom();

        player.fight.wisdom++;
        calcWisdomStats();
        calcPlayerIlvl();
    }
    setLSPlayer(player);
    updateAllInformations();
})

$(document).on('click', '#woodcutting', () => {
    player.jobExp.woodcutting.current += 1;
    if (player.jobExp.woodcutting.current >= player.jobExp.woodcutting.needed){
        player.jobExp.woodcutting.current = 0;
        player.job.woodcutting.lvl++;
        calcPlayerJobsLvl();
        calcWoodcuttingLoot();
    }
    setLSPlayer(player);
    updateAllInformations();
})

$(document).on('click', '#mining', () => {
    player.jobExp.mining.current += 1;
    if (player.jobExp.mining.current >= player.jobExp.mining.needed){
        player.jobExp.mining.current = 0;
        player.job.mining.lvl++;
        calcPlayerJobsLvl();
    }
    setLSPlayer(player);
    updateAllInformations();
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

$(document).on('click', '#zonebuttonJobs', () => {
    document.querySelectorAll('[zonetype="jobs"]').forEach((zone) => {
        zone.classList.contains('none') ? zone.classList.remove('none') : zone.classList.add('none');
    })
})

$(document).on('click', '#zonebuttonTraining', () => {
    document.querySelectorAll('[zonetype="training"]').forEach((zone) => {
        zone.classList.contains('none') ? zone.classList.remove('none') : zone.classList.add('none');
    })
})

$(document).on('click', '#zonebuttonAll', function() {
    if (this.getAttribute('state') === 'hide'){
        document.querySelectorAll('[zonetype]').forEach((zone) => {
            zone.classList.add('none');
        });
        this.setAttribute('state', 'show');
        console.log(this)
        this.textContent = 'Show all zones';
    }
    else{
        document.querySelectorAll('[zonetype]').forEach((zone) => {
            zone.classList.remove('none');
        });
        this.setAttribute('state', 'hide');
        this.textContent = 'Hide all zones';
    }
})