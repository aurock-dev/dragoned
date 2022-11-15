const express = require("express");
const socketio = require("socket.io");

const app = express();

const clientPath = `${__dirname}/../`;
app.use(express.static(clientPath));

app.get("/", (req, res) => {
    res.sendFile(`${clientPath}/index.html`);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

const io = socketio(server);
var connectedPlayerList = {};

io.on("connection", (socket) => {
    socket.on("playerConnection", (player) => {
        if (typeof player.name === "string" && typeof player.ilvl === "number") {
            if (!connectedPlayerList.hasOwnProperty(socket.id)) {
                connectedPlayerList[socket.id] = player;
            }

            io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
            io.emit("updateConnectionState", true);
        } else {
            io.emit("updateConnectionState", false);
        }
    });

    socket.on("disconnect", () => {
        delete connectedPlayerList[socket.id];
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("updateConnectedPlayerList", () => {
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("updateClientName", (playerName) => {
        connectedPlayerList[socket.id] = playerName;
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("playerUpdate", (player) => {
        connectedPlayerList[socket.id] = player;
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("callTarget", (targetId) => {
        socket.to(targetId).emit("fightRequest", {
            player: connectedPlayerList[socket.id],
            playerId: socket.id,
        });
    });

    socket.on("fightResponseTrue", (caller) => {
        let winner = launchFight(connectedPlayerList[caller], connectedPlayerList[socket.id]);
        console.log("Winner is " + winner);

        socket.emit("sendFightResponseTrue", winner);
        socket.to(caller).emit("sendFightResponseTrue", winner);
    });

    socket.on("fightResponseFalse", (caller) => {
        socket.to(caller).emit("sendFightResponseFalse", connectedPlayerList[socket.id].name);
    });

    socket.on("disableFight", () => {
        io.emit("disableFightForClients", socket.id);
    })

    socket.on("enableFight", () => {
        io.emit("enableFightForClients", socket.id);
    })
});

function launchFight(caller, target) {
    let copyCaller = { ...caller };
    let copyTarget = { ...target };

    console.log(copyCaller.name + " VS " + copyTarget.name);

    let first = copyCaller.initiative >= copyTarget.initiative ? copyCaller : copyTarget;
    console.log('first:', first.name)

    if (first === copyCaller){
        // return fightWithCallerFirst(copyCaller, copyTarget);
        return fight(copyCaller, copyTarget);
    }
    else{
        // return fightWithTargetFirst(copyTarget, copyCaller);
        return fight(copyTarget, copyCaller);
    }
}
function fight(playerA, playerB){
    while (true){
        // console.log('==========================')

        // console.log(playerA.name + ' attacks!')
        if (randHundred() <= playerA.criticalChance){
            playerB.hp = playerB.hp - ((playerA.attack *  playerA.criticalDamage) - playerB.defense)
            // console.log(playerA.name + ' critics!!')
            // console.log(playerA.name + ' does ' + ((playerA.attack *  playerA.criticalDamage) - playerB.defense) + ' damages')
        }
        else{
            playerB.hp = playerB.hp - (playerA.attack - playerB.defense);
            // console.log(playerA.name + ' does ' + (playerA.attack - playerB.defense) + ' damages')
        }
        // console.log(playerB.name + ' HP left: ' + playerB.hp)
        if (playerB.hp <= 0) { 
            return playerA.name;
        }

        // console.log('-----------')

        // console.log(playerB.name + ' attacks!')
        if (randHundred() <= playerB.criticalChance){
            // console.log(playerB.name + ' critics!!')
            // console.log(playerB.name + ' does ' + ((playerB.attack *  playerB.criticalDamage) - playerA.defense) + ' damages')
            playerA.hp = playerA.hp - ((playerB.attack *  playerB.criticalDamage) - playerA.defense)
        }
        else{
            playerA.hp = playerA.hp - (playerB.attack - playerA.defense);
            // console.log(playerB.name + ' does ' + (playerB.attack - playerA.defense) + ' damages')
        }
        // console.log(playerA.name + ' HP left: ' + playerA.hp)
        if (playerA.hp <= 0) { 
            return playerB.name;
        }
    }
}

function randHundred(){
    return Math.floor(Math.random() * 100);
}
