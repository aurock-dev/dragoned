function updatePlayerInformations(){
    document.querySelector('#inputChangeName').value = player.name;
    document.querySelector('#currentPlayerName').textContent = player.name;

    document.querySelector('#playerIlvl').textContent = player.ilvl;

    document.querySelector('#hpAmount').textContent = player.hp;
    document.querySelector('#hpMaxAmount').textContent = player.hpMax;
    document.querySelector('#mpAmount').textContent = player.mp;
    document.querySelector('#mpMaxAmount').textContent = player.mpMax;
    document.querySelector('#forceAmount').textContent = player.force;
    document.querySelector('#attackAmount').textContent = player.attack;
    document.querySelector('#criticalDamagesAmount').textContent = 'x' + player.criticalDamage;
    document.querySelector('#vigourAmount').textContent = player.vigour;
    document.querySelector('#defenseAmount').textContent = player.defense;
    document.querySelector('#hpBonusAmount').textContent = '+' + player.HPBonus;
    document.querySelector('#agilityAmount').textContent = player.agility;
    document.querySelector('#initiativeAmount').textContent = player.initiative;
    document.querySelector('#criticalChancesAmount').textContent = player.criticalChance + '%';
    document.querySelector('#wisdomAmount').textContent = player.wisdom;
    document.querySelector('#expBonusAmount').textContent = '+' + player.expBonus;
    document.querySelector('#mpBonusAmount').textContent = '+' + player.MPBonus;
}

function updateGameInformations(){
    document.querySelector('#neededExpForce').textContent = game.neededExpForce;
    document.querySelector('#neededExpVigour').textContent = game.neededExpVigour;
    document.querySelector('#neededExpAgility').textContent = game.neededExpAgility;
    document.querySelector('#neededExpWisdom').textContent = game.neededExpWisdom;

    document.querySelector('#stateFightRequests').textContent = game.stateFightRequests;
}

function updateAllStats(){
    calcForceStats();
    calcVigourStats();
    calcAgilityStats();
    calcWisdomStats();
}

function calcForceStats(){
    player.attack = 150 + (player.force*15);
    player.criticalDamage = 2 + (player.force/10);
}

function calcVigourStats(){
    player.defense = 50 + (player.vigour*5);
    player.HPBonus = 0 + (player.vigour*25);
    player.hpMax = 2000 + player.HPBonus;
    player.hp = player.hpMax;
}

function calcAgilityStats(){
    player.initiative = 1 + (player.agility*1);
    player.criticalChance = 5 + (player.agility/2);
}

function calcWisdomStats(){
    player.expBonus = 0 + (player.wisdom/2);
    player.MPBonus = 0 + (player.wisdom*10);
    player.mpMax = 500 + player.MPBonus;
    player.mp = player.mpMax;
}

function calcExpNeededForce(){
    game.neededExpForce = game.neededExpForce + ((player.force+1)*33);
}

function calcExpNeededVigour(){
    game.neededExpVigour = game.neededExpVigour + ((player.vigour+1)*33);
}

function calcExpNeededAgility(){
    game.neededExpAgility = game.neededExpAgility + ((player.agility+1)*33);
}

function calcExpNeededWisdom(){
    game.neededExpWisdom = game.neededExpWisdom + ((player.wisdom+1)*33);
}

function calcPlayerIlvl(){
    player.ilvl = player.force + player.vigour + player.agility + player.wisdom;
    socket.emit('playerUpdate', player);
}