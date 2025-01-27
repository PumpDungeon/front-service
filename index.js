const express = require('express');

const {generateMap} = require("./helpers/generateMap");

const app = express();

app.use(express.json());

app.get('/api/generate', (req, res) => {
    const dungeon = generateMap();

    return res.status(200).json({
        map: dungeon
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Dungeon Service running on port ${PORT}`);
});
