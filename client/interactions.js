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
    let exp = parseInt(document.querySelector('#currentExpForce').textContent);
    let force = parseInt(document.querySelector('#forceAmount').textContent);
    exp++;
    if (exp >= 100){
        exp = 0;
        force++;
        document.querySelector('#forceAmount').textContent = force;
    }
    document.querySelector('#currentExpForce').textContent = exp;
})

$(document).on('click', '#trainVigour', () => {
    let exp = parseInt(document.querySelector('#currentExpVigour').textContent);
    let vigour = parseInt(document.querySelector('#vigourAmount').textContent);
    exp++;
    if (exp >= 100){
        exp = 0;
        vigour++;
        document.querySelector('#vigourAmount').textContent = vigour;
    }
    document.querySelector('#currentExpVigour').textContent = exp;
})

$(document).on('click', '#trainAgility', () => {
    let exp = parseInt(document.querySelector('#currentExpAgility').textContent);
    let agility = parseInt(document.querySelector('#agilityAmount').textContent);
    exp++;
    if (exp >= 100){
        exp = 0;
        agility++;
        document.querySelector('#agilityAmount').textContent = agility;
    }
    document.querySelector('#currentExpAgility').textContent = exp;
})

$(document).on('click', '#trainWisdom', () => {
    let exp = parseInt(document.querySelector('#currentExpWisdom').textContent);
    let wisdom = parseInt(document.querySelector('#wisdomAmount').textContent);
    exp++;
    if (exp >= 100){
        exp = 0;
        wisdom++;
        document.querySelector('#wisdomAmount').textContent = wisdom;
    }
    document.querySelector('#currentExpWisdom').textContent = exp;
})