var player = {
    general: {
        name: '',
        ilvl: 0,
        joblvl: 0,
        stateFightRequests: 'Yes',
    },
    states: {
        woodcuttingJob: null
    },
    fight: {
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
    },
    fightExp: {
        force:{
            current: 0,
            needed: 100,        
        },
        vigour:{
            current: 0,
            needed: 100,        
        },
        agility:{
            current: 0,
            needed: 100,        
        },
        wisdom:{
            current: 0,
            needed: 100,        
        },
    },
    job: {
        woodcutting: {
            lvl: 0,
            time: 30000,
            lootChance: 10,
        },
        mining: {
            lvl: 0,
            time: 30000,
            lootChance: 10,
        }
    },
    jobExp: {
        woodcutting: {
            current: 0,
            needed: 100,
        },
        mining: {
            current: 0,
            needed: 100,
        }
    },
    ressources: {
        wood: 0,
        stone: 0,
    }
}