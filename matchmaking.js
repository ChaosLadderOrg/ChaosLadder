const { mongoose, Schema, db } = require('./mongoose.js');
const { getWeekNumber } = require('./schedule.js');
const { getSummonerNameById, getMatchesBySummonerId, getMatchData, getStatsById } = require('./summoner.js');
const { user, userModel } = require('./user.js');
const matchmaking = Schema({
    weekNumber: Number,
    players: [{
        summonerID: Number,
        summonerName: String,
        kills: Number,
        assists: Number,
        deaths: Number,
        creepScore: Number,
        winner: Boolean
    }]
});
const matchmakingModel = mongoose.model('matchmaking', matchmaking);

var playerList = [];
var matchedPairs = [];
var name1;
var name2;

var getAllIds = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find({}, 'summonerID').exec(function (error, summonerIdList) {
        callback(summonerIdList);
    });
};

var getMatches = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    matchmakingModel.find().exec(function (error, matchList) {
        callback(matchList);
    })
};

var createMatchList = (callback) => {
    matchedPairs = [];
    playerList = [];
    getAllIds((summonerIdList) => {
        if (summonerIdList.length % 2 == 1) {
            summonerIdList.sort(function () { return 0.5 - Math.random(); })
            summonerIdList.pop();
        }
        summonerIdList.forEach(function (element) {
            playerList.push(element.summonerID);
        }, this);
        var playerList1 = playerList.slice(),
            playerList2 = playerList.slice();

        playerList1.sort(function () { return 0.5 - Math.random(); });
        playerList2.sort(function () { return 0.5 - Math.random(); });

        while (playerList1.length) {
            name1 = playerList1.pop();
            name2 = playerList2[0];
            if (name2 == name1) {
                name2 = playerList2.pop();
            }
            playerList2.shift();
            matchedPairs.push({ player1: name1, player2: name2 });
            var index2 = playerList2.indexOf(name1);
            var index1 = playerList1.indexOf(name2);
            if (playerList2.indexOf(name1) >= 0) playerList2.splice(index2, 1);
            if (playerList1.indexOf(name2) >= 0) playerList1.splice(index1, 1);
        }
        createMatches(matchedPairs);
        callback(matchedPairs);
    });
};

var createMatches = (matchedPairs, (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    matchedPairs.forEach(function (element) {

        var player1Name, player2Name;

        if (player1Name !== null && player2Name !== null) {
            var matchInsert = new matchmakingModel({
                weekNumber: getWeekNumber(),
                players: [{
                    summonerID: element.player1,
                },
                {
                    summonerID: element.player2,
                }]
            });
            matchInsert.save(function (error) {
                if (error) throw error;
                console.log('MATCH INSERT', matchInsert);
            });
        }
    }, this);
});

module.exports = {
    matchmaking,
    matchmakingModel,
    createMatchList,
    getAllIds,
    getMatches
};