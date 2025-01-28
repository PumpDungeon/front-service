const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');

const {generateMap} = require("./helpers/generateMap");

const app = express();

let channel

app.use(express.json());
app.use(cors())

async function sendMessageToRabbitMQ(queue, message) {
    try {
        await channel.assertQueue(queue, {
            durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`Message sent: ${JSON.stringify(message)}`);
    } catch (error) {
        console.error('Error sending message to RabbitMQ:', error);
    }
}

app.post('/api/fight', async (req, res) => {
    const {player} = req.body;

    if (!player) {
        return res.status(500);
    }

    await fetch('http://localhost:3002/api/setPlayer', {
        body: JSON.stringify({
           ...player,
           hp: player.hp - 10
        }),
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        cors: 'no-cors',
        credentials: 'include'
    });

    await sendMessageToRabbitMQ(player._id, {
        player: {
            ...player,
            hp: player.hp - 10,
            gold: player.gold + 3
        }
    })

    return res.status(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    const connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
    console.log(`Dungeon Service running on port ${PORT}`);
});
