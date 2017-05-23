const { mongoose, Schema, db } = require('./mongoose.js');
const { getAllUsers } = require('./user.js');
const { getWeeklySummonerStatsById } = require('./summoner.js');
const { getWeekNumber } = require('./schedule.js');
var players = [];
const leaderboard = Schema({
    weekNumber: Number,
    players: [{
        summonerID: Number,
        summonerName: String,
        kda: Number,
        creepScore: Number,
        position: Number
    }]
});
const leaderboardModel = mongoose.model('leaderboard', leaderboard);
var createLeaderboard = (callback) => {
    getAllUsers((userList) => {
        userList.forEach(function (element) {
            getWeeklySummonerStatsById(element.summonerID, (weeklySummonerStats) => {
                console.log('stats here ' + weeklySummonerStats);
                players.push({ summonerID: element.summonerID, kda: weeklySummonerStats });
                console.log(players);
            })
        }, this)
        
        //TODO: replace test data with the actual data
        var leaderboardInsert = new leaderboardModel({
            weekNumber: getWeekNumber(),
            players: [{ summonerID: 72467946, kda: 28.08 },
            { summonerID: 90028860, kda: 13.25 },
            { summonerID: 82746795, kda: 29.28 },
            { summonerID: 19529511, kda: 28.08 },
            { summonerID: 19024737, kda: 15.87 },
            { summonerID: 39494934, kda: 18.33 },
            { summonerID: 80367072, kda: 26.87 },
            { summonerID: 40956931, kda: 21 },
            { summonerID: 53668796, kda: 48 },
            { summonerID: 27280935, kda: 8.03 },
            { summonerID: 22888443, kda: 11.79 }]
        });
        leaderboardInsert.save(function (error) {
            if (error) throw error;
        })
    })
};
createLeaderboard();