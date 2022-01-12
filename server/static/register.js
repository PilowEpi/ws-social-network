const client = new WebSocket('ws://localhost:4242/register');
client.binaryType = "arraybuffer";

client.addEventListener('open', () => {
    client.addEventListener('message', (event) => {
        initListOfTasks();
        createMessageCard(JSON.parse(event.data));
    })
});

let cardContainer;

let createMessageCard = (message) => {
    console.log(message);

    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = 'New registration :';
    title.className = 'card-title';

    let txt = document.createElement('p');
    txt.innerText = message.msg;
    txt.className = 'card-text';

    cardBody.appendChild(title);
    cardBody.appendChild(txt);
    card.appendChild(cardBody);
    let element = document.getElementById('card-container');
    cardContainer.insertBefore(card, element.firstChild);
}

let initListOfTasks = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }
    cardContainer = document.getElementById('card-container');
};