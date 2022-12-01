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
var combatlog = []

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
        combatlog.push("Winner is " + winner);
        // console.log(combatlog)

        socket.emit("sendFightResponseTrue", {
            winner: winner,
            combatlog: combatlog
        });
        socket.to(caller).emit("sendFightResponseTrue", {
            winner: winner,
            combatlog: combatlog
        });
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

    combatlog.push(copyCaller.general.name + " VS " + copyTarget.general.name);

    let first = copyCaller.fight.initiative >= copyTarget.fight.initiative ? copyCaller : copyTarget;
    combatlog.push('first: '+first.general.name)

    if (first === copyCaller){
        return fight(copyCaller, copyTarget);
    }
    else{
        return fight(copyTarget, copyCaller);
    }
}

function fight(playerA, playerB){
    while (true){
        combatlog.push('==========================')

        combatlog.push(playerA.general.name + ' attacks!')
        if (randHundred() <= playerA.fight.criticalChance){
            playerB.fight.hp = playerB.fight.hp - ((playerA.fight.attack *  playerA.fight.criticalDamage) - playerB.fight.defense)
            combatlog.push(playerA.general.name + ' critics!!')
            combatlog.push(playerA.general.name + ' does ' + ((playerA.fight.attack *  playerA.fight.criticalDamage) - playerB.fight.defense) + ' damages')
        }
        else{
            playerB.fight.hp = playerB.fight.hp - (playerA.fight.attack - playerB.fight.defense);
            combatlog.push(playerA.general.name + ' does ' + (playerA.fight.attack - playerB.fight.defense) + ' damages')
        }
        combatlog.push(playerB.general.name + ' HP left: ' + playerB.fight.hp)
        if (playerB.fight.hp <= 0) { 
            return playerA.general.name;
        }

        combatlog.push('-----------')

        combatlog.push(playerB.general.name + ' attacks!')
        if (randHundred() <= playerB.fight.criticalChance){
            combatlog.push(playerB.general.name + ' critics!!')
            combatlog.push(playerB.general.name + ' does ' + ((playerB.fight.attack *  playerB.fight.criticalDamage) - playerA.fight.defense) + ' damages')
            playerA.fight.hp = playerA.fight.hp - ((playerB.fight.attack *  playerB.fight.criticalDamage) - playerA.fight.defense)
        }
        else{
            playerA.fight.hp = playerA.fight.hp - (playerB.fight.attack - playerA.fight.defense);
            combatlog.push(playerB.general.name + ' does ' + (playerB.fight.attack - playerA.fight.defense) + ' damages')
        }
        combatlog.push(playerA.general.name + ' HP left: ' + playerA.fight.hp)
        if (playerA.fight.hp <= 0) { 
            return playerB.general.name;
        }
    }
}

function randHundred(){
    return Math.floor(Math.random() * 100);
}
