$(document).on('click', '#woodcutting', () => {
    var percent = 0;
    if (player.states.jobbing === null){
        console.log('wood start')
        player.states.jobbing = setInterval(() => {
            percent += 50;
            $('.woodcuttingTime').width(calcPercentage(percent, player.job.woodcutting.time)+'%');
            document.querySelector('#currentTimeWoodcutting').textContent = ((player.job.woodcutting.time - percent)/1000).toFixed(0) +' sec'
            if (percent >= player.job.woodcutting.time){
                console.log('looting')
                calcWoodcuttingLoot();
                updatePlayerRessourcesInfos();
                percent = 0
            }
        }, 50);
    }
    else{
        console.log('job stop')
        clearInterval(player.states.jobbing);
        player.states.jobbing = null;
        $('.woodcuttingTime').width('0%');
        document.querySelector('#currentTimeWoodcutting').textContent = ''
        $('.miningTime').width('0%');
        document.querySelector('#currentTimeMining').textContent = ''
    }
})

$(document).on('click', '#mining', () => {
    var percent = 0;
    if (player.states.jobbing === null){
        console.log('mine start')
        player.states.jobbing = setInterval(() => {
            percent += 50;
            $('.miningTime').width(calcPercentage(percent, player.job.mining.time)+'%');
            document.querySelector('#currentTimeMining').textContent = ((player.job.mining.time - percent)/1000).toFixed(0) +' sec'
            if (percent >= player.job.mining.time){
                console.log('looting')
                calcMiningLoot();
                updatePlayerRessourcesInfos();
                percent = 0
            }
        }, 50);
    }
    else{
        console.log('job stop')
        clearInterval(player.states.jobbing);
        player.states.jobbing = null;
        $('.woodcuttingTime').width('0%');
        document.querySelector('#currentTimeWoodcutting').textContent = ''
        $('.miningTime').width('0%');
        document.querySelector('#currentTimeMining').textContent = ''
    }
})