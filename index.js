import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import amqp from 'amqplib';
// import { generateMap } from './helpers/generateMap.js';

const app = express();

dotenv.config();

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

    await fetch(`${process.env.PLAYER_SERVICE_URL}/api/setPlayer`, {
        body: JSON.stringify({
           pv: player.pv - 10
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
            gold: player.gold + 3
        }
    })

    return res.status(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
    channel = await connection.createChannel();
    console.log(`Fight Service running on port ${PORT}`);
});
