const mongoose = require('mongoose');

const dungeonSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    data: {
        type: [[Number]],
        required: true,
    },
});

module.exports = mongoose.model('Dungeon', dungeonSchema);
