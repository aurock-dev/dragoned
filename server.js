const express = require("express");
const socketio = require("socket.io");

const app = express();

const clientPath = `${__dirname}`;
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
});

function launchFight(caller, target) {
    let copyCaller = { ...caller };
    let copyTarget = { ...target };

    console.log(copyCaller.name + " VS " + copyTarget.name);

    let first = copyCaller.initiative >= copyTarget.initiative ? copyCaller : copyTarget;

    if (first === copyCaller){
        while (true){
            if (hitTarget(copyTarget, copyCaller) < 0) { 
                return copyCaller.name;
            }
        }
    }
    else{
        while (true){
            if (hitCaller(copyTarget, copyCaller) < 0) {
                return copyTarget.name;
            }
        }
    }
}

function hitTarget(copyTarget, copyCaller){
    copyTarget.hp = copyTarget.hp - (copyCaller.attack - copyTarget.defense);
    return copyTarget.hp;
}

function hitCaller(copyTarget, copyCaller){
    copyCaller.hp = copyCaller.hp - (copyTarget.attack - copyCaller.defense);
    return copyCaller.hp;
}
