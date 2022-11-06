function updatePlayerInformations(){
    document.querySelector('#inputChangeName').value = player.name;
    document.querySelector('#currentPlayerName').textContent = player.name;

    document.querySelector('#hpAmount').textContent = player.hp;
    document.querySelector('#hpMaxAmount').textContent = player.hpMax;
    document.querySelector('#mpAmount').textContent = player.mp;
    document.querySelector('#mpMaxAmount').textContent = player.mpMax;
    document.querySelector('#forceAmount').textContent = player.force;
    document.querySelector('#attackAmount').textContent = player.attack;
    document.querySelector('#criticalDamagesAmount').textContent = player.criticalDamage + '%';
    document.querySelector('#vigourAmount').textContent = player.vigour;
    document.querySelector('#defenseAmount').textContent = player.defense;
    document.querySelector('#hpBonusAmount').textContent = '+' + player.HPBonus;
    document.querySelector('#agilityAmount').textContent = player.agility;
    document.querySelector('#attackSpeedAmount').textContent = player.attackSpeed + '%';
    document.querySelector('#criticalChancesAmount').textContent = player.criticalChance + '%';
    document.querySelector('#wisdomAmount').textContent = player.wisdom;
    document.querySelector('#expBonusAmount').textContent = '+' + player.expBonus;
    document.querySelector('#mpBonusAmount').textContent = '+' + player.MPBonus;
}