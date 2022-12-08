const socket = io();

$(document).on('click', '#connectButton', function(){
    let username = document.querySelector('#usernameLogin').value;
    let password = document.querySelector('#passwordLogin').value;
    let credentials = {
        username: username,
        password: password
    }
    socket.emit('login', credentials);
})

$(document).on('click', '#createAccountButton', function(){
    let username = document.querySelector('#usernameSignin').value;
    let password = document.querySelector('#passwordSignin').value;
    let credentials = {
        username: username,
        password: password
    }
    socket.emit('signin', credentials);
})

socket.on('redirect', function(destination) {
    window.location.href = destination;
});

