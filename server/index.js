const express = require("express");
const ws = require("ws");

// WebSocket part

const wss = new ws.Server({
    noServer: true
});

wss.on('connection', (ws, rq) => {
    var endpoint = rq.url;

    if (!endpoint.startsWith('/register'))
        ws.terminate();
    ws.on('message', (message) => {
        console.log("Received message: " + message);
        let msg = {
            msg: message.toString()
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(msg));
        });
    });

})

// Express part

const app = express();

var server = app.listen(4242, () => {
    console.log("Server listening : http://localhost:4242");
})

app.use("/static", express.static('./static/'));

app.get("/ex00", function(req, res) {
    res.sendFile(__dirname + '/front/register.html');
});

app.get("/basic", function(req, res) {
    res.sendFile(__dirname + '/front/basic.html');
});

app.get("/complexe", function(req, res) {
    res.sendFile(__dirname + '/front/complexe.html');
});

// Express api part

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    })
});