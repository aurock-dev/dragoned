//#region -- DIALOG CHANGE NAME
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    setLSPlayerName(playerName)
    socket.emit('updateClientName', getLSPlayerName());
    document.querySelector('#inputChangeName').value = getLSPlayerName();
    document.querySelector('#currentPlayerName').textContent = getLSPlayerName();
})
//#endregion

//#region -- MEMBERS LIST
let dialogFight = document.querySelector('#dialogFight');  

$(document).on('click', '[name="targetPlayer"]', function() {
    let senderId = socket.id;
    let receiverId = this.getAttribute('playerId');
    socket.emit('callTarget', {senderId:senderId, receiverId:receiverId});
})
//#endregion

//#region -- NAVBAR
$(document).on('click', '#showViewOptions', function(){
    let viewOptionsClasslist = document.querySelector('#viewOptions').classList;
    viewOptionsClasslist.contains('hidden') ? viewOptionsClasslist.remove('hidden') : viewOptionsClasslist.add('hidden');
})

$(document).on('click', '#showViewServer', function(){
    let viewServerClasslist = document.querySelector('#viewServer').classList;
    viewServerClasslist.contains('hidden') ? viewServerClasslist.remove('hidden') : viewServerClasslist.add('hidden');
})
//#endregion

//#region -- OPTIONS
$(document).on('click', '#resetLocalStorage', function(){
    resetLocalStorage();
})
//#endregion

$(document).on('click', '#trainForce', () => {
    game.currentExpForce++;
    if (game.currentExpForce >= 100){
        game.currentExpForce = 0;
        player.force++;
        updatePlayerInformations();
        setLSPlayer(player);
    }
    document.querySelector('#currentExpForce').textContent =  game.currentExpForce;
})

$(document).on('click', '#trainVigour', () => {
    game.currentExpVigour++;
    if (game.currentExpVigour >= 100){
        game.currentExpVigour = 0;
        player.vigour++;
        updatePlayerInformations();
        setLSPlayer(player);
    }
    document.querySelector('#currentExpVigour').textContent =  game.currentExpVigour;
})

$(document).on('click', '#trainAgility', () => {
    game.currentExpAgility++;
    if (game.currentExpAgility >= 100){
        game.currentExpAgility = 0;
        player.agility++;
        updatePlayerInformations();
        setLSPlayer(player);
    }
    document.querySelector('#currentExpAgility').textContent =  game.currentExpAgility;
})

$(document).on('click', '#trainWisdom', () => {
    game.currentExpWisdom++;
    if (game.currentExpWisdom >= 100){
        game.currentExpWisdom = 0;
        player.wisdom++;
        updatePlayerInformations();
        setLSPlayer(player);
    }
    document.querySelector('#currentExpWisdom').textContent =  game.currentExpWisdom;
})