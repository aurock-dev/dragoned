//#region -- DIALOG CHANGE NAME
let dialogChangeName = document.querySelector('#dialogNameChange');  

$(document).on('click', '#showDialogChangeName', function(){
    dialogChangeName.show();
})
$(document).on('click', '#validateChangeName', function(){
    let playerName = document.querySelector('#inputChangeName').value;
    setLSPlayerName(playerName)
    socket.emit('updateClientName', getLSPlayerName());
    dialogChangeName.close();
})
$(document).on('click', '#cancelChangeName', function(){
    dialogChangeName.close();
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