const { mongoose, Schema, db } = require('./mongoose.js');
const leaderboard = Schema({
    weekNumber: Number,
    players: [{
        summonerID: Number,
        summonerName: String,
        kills: Number,
        assists: Number,
        deaths: Number,
        creepScore: Number,
        position: Number
    }]
});