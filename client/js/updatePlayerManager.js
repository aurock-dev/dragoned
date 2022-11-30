function updatePlayerGeneralInfos(){
    document.querySelector('#inputChangeName').value = player.general.name;
    document.querySelector('#currentPlayerName').textContent = player.general.name;
    document.querySelector('#playerIlvl').textContent = player.general.ilvl;
    document.querySelector('#playerJobsLvl').textContent = player.general.joblvl;
    document.querySelector('#stateFightRequests').textContent = player.general.stateFightRequests;
}

function updatePlayerFightInfos(){
    document.querySelector('#hpAmount').textContent = player.fight.hp;
    document.querySelector('#hpMaxAmount').textContent = player.fight.hpMax;
    document.querySelector('#mpAmount').textContent = player.fight.mp;
    document.querySelector('#mpMaxAmount').textContent = player.fight.mpMax;
    document.querySelector('#forceAmount').textContent = player.fight.force;
    document.querySelector('#attackAmount').textContent = player.fight.attack;
    document.querySelector('#criticalDamagesAmount').textContent = 'x' + player.fight.criticalDamage;
    document.querySelector('#vigourAmount').textContent = player.fight.vigour;
    document.querySelector('#defenseAmount').textContent = player.fight.defense;
    document.querySelector('#hpBonusAmount').textContent = '+' + player.fight.HPBonus;
    document.querySelector('#agilityAmount').textContent = player.fight.agility;
    document.querySelector('#initiativeAmount').textContent = player.fight.initiative;
    document.querySelector('#criticalChancesAmount').textContent = player.fight.criticalChance + '%';
    document.querySelector('#wisdomAmount').textContent = player.fight.wisdom;
    document.querySelector('#expBonusAmount').textContent = '+' + player.fight.expBonus;
    document.querySelector('#mpBonusAmount').textContent = '+' + player.fight.MPBonus;
}

function updatePlayerFightExpInfos(){
    document.querySelector('#neededExpForce').textContent = player.fightExp.force.needed;
    document.querySelector('#currentExpForce').textContent =  player.fightExp.force.current.toFixed(1);
    $('.force').width(calcPercentage(player.fightExp.force.current, player.fightExp.force.needed)+'%');

    document.querySelector('#neededExpVigour').textContent = player.fightExp.vigour.needed;
    document.querySelector('#currentExpVigour').textContent =  player.fightExp.vigour.current.toFixed(1);
    $('.vigour').width(calcPercentage(player.fightExp.vigour.current, player.fightExp.vigour.needed)+'%');

    document.querySelector('#neededExpAgility').textContent = player.fightExp.agility.needed;
    document.querySelector('#currentExpAgility').textContent =  player.fightExp.agility.current.toFixed(1);
    $('.agility').width(calcPercentage(player.fightExp.agility.current, player.fightExp.agility.needed)+'%');

    document.querySelector('#neededExpWisdom').textContent = player.fightExp.wisdom.needed;
    document.querySelector('#currentExpWisdom').textContent =  player.fightExp.wisdom.current.toFixed(1);
    $('.wisdom').width(calcPercentage(player.fightExp.wisdom.current, player.fightExp.wisdom.needed)+'%');
}

function updatePlayerJobInfos(){
    document.querySelector('#woodcuttingLvl').textContent = player.job.woodcutting.lvl;
    document.querySelector('#woodcuttingTimeAmount').textContent = player.job.woodcutting.time/1000 + ' sec';
    document.querySelector('#woodcuttingLootChanceAmount').textContent = player.job.woodcutting.lootChance + '%';

    document.querySelector('#miningLvl').textContent = player.job.mining.lvl;
    document.querySelector('#miningTimeAmount').textContent = player.job.mining.time/1000 + ' sec';
    document.querySelector('#miningLootChanceAmount').textContent = player.job.mining.lootChance + '%';
}

function updatePlayerJobExpInfos(){
    document.querySelector('#neededExpWoodcutting').textContent = player.jobExp.woodcutting.needed;
    document.querySelector('#currentExpWoodcutting').textContent =  player.jobExp.woodcutting.current.toFixed(1);
    $('.woodcutting').width(calcPercentage(player.jobExp.woodcutting.current, player.jobExp.woodcutting.needed)+'%');

    document.querySelector('#neededExpMining').textContent = player.jobExp.mining.needed;
    document.querySelector('#currentExpMining').textContent =  player.jobExp.mining.current.toFixed(1);
    $('.mining').width(calcPercentage(player.jobExp.mining.current, player.jobExp.mining.needed)+'%');
}

function updatePlayerRessourcesInfos(){
    document.querySelector('#woodAmount').textContent = player.ressources.wood;
    document.querySelector('#stoneAmount').textContent = player.ressources.stone;
}

function updateAllInformations(){
    updatePlayerGeneralInfos();
    updatePlayerFightInfos();
    updatePlayerFightExpInfos();
    updatePlayerJobInfos();
    updatePlayerJobExpInfos();
    updatePlayerRessourcesInfos();
}

function calcPlayerIlvl(){
    player.general.ilvl = player.fight.force + player.fight.vigour + player.fight.agility + player.fight.wisdom;
    socket.emit('playerUpdate', player);
}

function calcPlayerJobsLvl(){
    player.general.joblvl = player.job.woodcutting.lvl + player.job.mining.lvl;
    socket.emit('playerUpdate', player);
}

function calcForceStats(){
    player.fight.attack = 150 + (player.fight.force*15);
    player.fight.criticalDamage = 2 + (player.fight.force/10);
}

function calcVigourStats(){
    player.fight.defense = 50 + (player.fight.vigour*5);
    player.fight.HPBonus = 0 + (player.fight.vigour*25);
    player.fight.hpMax = 2000 + player.fight.HPBonus;
    player.fight.hp = player.fight.hpMax;
}

function calcAgilityStats(){
    player.fight.initiative = 1 + (player.fight.agility*1);
    player.fight.criticalChance = 5 + (player.fight.agility/2);
}

function calcWisdomStats(){
    player.fight.expBonus = 0 + (player.fight.wisdom/2);
    player.fight.MPBonus = 0 + (player.fight.wisdom*10);
    player.fight.mpMax = 500 + player.fight.MPBonus;
    player.fight.mp = player.fight.mpMax;
}

function calcExpNeededForce(){
    player.fightExp.force.needed = player.fightExp.force.needed + ((player.fight.force+1)*33);
}

function calcExpNeededVigour(){
    player.fightExp.vigour.needed = player.fightExp.vigour.needed + ((player.fight.vigour+1)*33);
}

function calcExpNeededAgility(){
    player.fightExp.agility.needed = player.fightExp.agility.needed + ((player.fight.agility+1)*33);
}

function calcExpNeededWisdom(){
    player.fightExp.wisdom.needed = player.fightExp.wisdom.needed + ((player.fight.wisdom+1)*33);
}

function calcWoodcuttingStats(){
    player.job.woodcutting.time = 30000 - (player.job.woodcutting.lvl * 250); 
    player.job.woodcutting.lootChance = 10 + (player.job.woodcutting.lvl/2); 
}

function calcExpNeededWoodcutting(){
    player.jobExp.woodcutting.needed = player.jobExp.woodcutting.needed + ((player.job.woodcutting.lvl+1)*33);
}

function addExpWoodcutting(){
    player.jobExp.woodcutting.current += player.jobExp.woodcutting.needed * (5/100);
    updatePlayerJobExpInfos();
}

function calcWoodcuttingLoot(){
    if (randHundred() <= player.job.woodcutting.lootChance){
        player.ressources.wood++;
        toaster('Wood looted!')
        setLSPlayer(player);
    }
}

function calcMiningStats(){
    player.job.mining.time = 30000 - (player.job.mining.lvl * 250); 
    player.job.mining.lootChance = 10 + (player.job.mining.lvl/2); 
}

function calcExpNeededMining(){
    player.jobExp.mining.needed = player.jobExp.mining.needed + ((player.job.mining.lvl+1)*33);
}

function addExpMining(){
    player.jobExp.mining.current += player.jobExp.mining.needed * (5/100);
    updatePlayerJobExpInfos();
}

function calcMiningLoot(){
    if (randHundred() <= player.job.mining.lootChance){
        player.ressources.stone++;
        toaster('Stone looted!')
        setLSPlayer(player);
    }
}
