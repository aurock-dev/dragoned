var player = {
    name: '',
    gold: 100,
    ilvl: 0,
    force: 0,
    vigour: 0,
    agility: 0,
    wisdom: 0,
    hp: 2000,
    hpMax: 2000,
    mp: 500,
    mpMax: 500,
    attack: 150,
    defense: 50,
    HPBonus: 0,
    MPBonus: 0,
    initiative: 1,
    criticalChance: 5,
    criticalDamage: 2,
    expBonus: 0,
}

var game = {
    currentExpForce: 0,
    currentExpVigour: 0,
    currentExpAgility: 0,
    currentExpWisdom: 0,
    neededExpForce: 100,
    neededExpVigour: 100,
    neededExpAgility: 100,
    neededExpWisdom: 100,
    stateFightRequests: 'Yes',
}

var jobs = {
    woodcutting: {
        lvl: 0,
        currentExp: 0,
        neededExp: 100,
        lootChance: 50,
    },
    mining: {
        lvl: 0,
        currentExp: 0,
        neededExp: 100,
        lootChance: 50,
    }
}

var ressources = {}