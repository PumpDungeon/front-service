const express = require('express');

const { getAllDungeons, getDungeonById, createDungeon, updateDungeon, deleteDungeon, enterDungeon } = require('./dungeonController');

const app = express();

app.use(express.json());

app.get('/api/dungeons', getAllDungeons);
app.get('/api/dungeons/:id', getDungeonById);
app.post('/api/dungeons', createDungeon);
app.put('/api/dungeons/:id', updateDungeon);
app.delete('/api/dungeons/:id', deleteDungeon);

// Example route: hero enters the dungeon
app.post('/api/dungeons/:id/enter', enterDungeon);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dungeon Service running on port ${PORT}`);
});
