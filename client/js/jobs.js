$(document).on('click', '#woodcutting', () => {
    if (player.states.woodcuttingJob === null){
        console.log('wood start')
        player.states.woodcuttingJob = setInterval(() => {
            calcWoodcuttingLoot();
        }, player.job.woodcutting.time);
    }
    else{
        console.log('wood stop')
        clearInterval(player.states.woodcuttingJob);
        player.states.woodcuttingJob = null;
    }
})

$(document).on('click', '#mining', () => {
    setInterval(() => {
        calcMiningLoot();
    }, player.job.mining.time);
})