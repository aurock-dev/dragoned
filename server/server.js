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
        if (typeof player.general.name === "string") {
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
        connectedPlayerList[socket.id].general.name = playerName;
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("playerUpdate", (player) => {
        connectedPlayerList[socket.id] = player;
        io.emit("updateConnectedPlayerListForClients", connectedPlayerList);
    });

    socket.on("callTarget", (targetId) => {
        socket.to(targetId).emit("fightRequest", {
            callerObject: connectedPlayerList[socket.id],
            callerId: socket.id,
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

    console.log(copyCaller.general.name + " VS " + copyTarget.general.name);

    let first = copyCaller.fight.initiative >= copyTarget.fight.initiative ? copyCaller : copyTarget;
    console.log('first:', first.general.name)

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
        if (randHundred() <= playerA.fight.criticalChance){
            playerB.fight.hp = playerB.fight.hp - ((playerA.fight.attack *  playerA.fight.criticalDamage) - playerB.fight.defense)
            // console.log(playerA.name + ' critics!!')
            // console.log(playerA.name + ' does ' + ((playerA.attack *  playerA.criticalDamage) - playerB.defense) + ' damages')
        }
        else{
            playerB.fight.hp = playerB.fight.hp - (playerA.fight.attack - playerB.fight.defense);
            // console.log(playerA.name + ' does ' + (playerA.attack - playerB.defense) + ' damages')
        }
        // console.log(playerB.name + ' HP left: ' + playerB.hp)
        if (playerB.fight.hp <= 0) { 
            return playerA.general.name;
        }

        // console.log('-----------')

        // console.log(playerB.name + ' attacks!')
        if (randHundred() <= playerB.fight.criticalChance){
            // console.log(playerB.name + ' critics!!')
            // console.log(playerB.name + ' does ' + ((playerB.attack *  playerB.criticalDamage) - playerA.defense) + ' damages')
            playerA.fight.hp = playerA.fight.hp - ((playerB.fight.attack *  playerB.fight.criticalDamage) - playerA.fight.defense)
        }
        else{
            playerA.fight.hp = playerA.fight.hp - (playerB.fight.attack - playerA.fight.defense);
            // console.log(playerB.name + ' does ' + (playerB.attack - playerA.defense) + ' damages')
        }
        // console.log(playerA.name + ' HP left: ' + playerA.hp)
        if (playerA.fight.hp <= 0) { 
            return playerB.general.name;
        }
    }
}

function randHundred(){
    return Math.floor(Math.random() * 100);
}
