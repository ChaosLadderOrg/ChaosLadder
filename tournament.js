const { mongoose, Schema, db } = require('./mongoose.js');
const { getWeeklySummonerStatsById } = require('./summoner.js');
const { getWeekNumber } = require('./schedule.js');
const { matchmakingModel, getAllIds } = require('./matchmaking.js');
const leaderboard = Schema({
    summonerID: Number,
    wins: Number,
    position: Number
});
const leaderboardModel = mongoose.model('leaderboard', leaderboard);

var players = [];

var victoryCounter = (victoryCount) => {
    var summonerId;

    getAllIds((userList) => {
        userList.forEach(function (element) {
            summonerId = element.summonerID;
            countWinsBySummonerID(summonerId, (conf) => {
                victoryCount(conf);
            });
        }, this)
    });
};

var countWinsBySummonerID = (summonerId, wins) => {
    matchmakingModel.find().exec(function (error, matches) {
        var wins = 0;
        matches.forEach(function (element) {
            console.log(element.players);
            if (element.players[0].summonerID == summonerId && element.players[0].winner == true) {
                wins++;

            } else if (element.players[1].summonerID == summonerId && element.players[1].winner == true) {
                wins++;
            }
        }, this);

        var leaderboardInsert = new leaderboardModel({
            summonerID: summonerId,
            wins: wins
        });
        console.log(leaderboardInsert);
        leaderboardInsert.save(function (error) {
            if (error) throw error;
            console.log('LEADERBOARD INSERT', leaderboardInsert);
        });
    });
    wins();
};

var getLeaderboard = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    leaderboardModel.find().exec(function (error, leaderboard) {
        callback(leaderboard);
    })
};

module.exports = {
    victoryCounter,
    getLeaderboard
};



