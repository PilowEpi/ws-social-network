const ws = require("ws");
const front = new ws('ws://localhost:4242/register');

front.on('open', () => {
    console.log('Front open');
    front.send("louis.christ@epitech.eu");
});