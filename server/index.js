const express = require("express");
const ws = require("ws");
//import WebSocket, { WebSocketServer } from 'ws';

const wss = new ws.Server({
    noServer: true
});

// To connect for messages : mes-from-to
wss.on('connection', (ws, rq) => {
    var endpoint = rq.url;
    if (endpoint.startsWith('/mes')) {
        const infos = endpoint.split('-');
        console.log(infos);
        if (infos.length == 3) {
            ws.SNfrom = infos[1];
            ws.SNto = infos[2];

            ws.on('message', (message) => {
                console.log("Received message: '" + message + "' from " + ws.SNfrom + " to " + ws.SNto);
                // Send message to the asked person
                wss.clients.forEach((client) => {
                    if (client.SNfrom = ws.SNto && client.SNto == ws.SNfrom) {
                        client.send(message);
                    }
                });
            });
        } else {
            ws.terminate();
        }
    } else {
        ws.terminate();
    }
});

const app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/front/index.html');
});

var server = app.listen(3000, () => {
    console.log("Server listening : http://localhost:3000");
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    })
});