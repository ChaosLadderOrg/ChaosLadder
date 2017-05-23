const { mongoose, Schema, db } = require('./mongoose.js');
const { getMatchesBySummonerId, getMatchData, getStatsById } = require('./summoner.js');
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
Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
// getAllUsers((usersList) => {
//     console.log(usersList);
// });
function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}
var getAllIds = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find({}, 'summonerID').exec(function (error, summonerIdList) {
        console.log('SUMMONER ID LIST', summonerIdList);
        callback(summonerIdList);
    });
};

var createMatchList = (callback) => {
    getAllIds((summonerIdList) => {
        if (summonerIdList.length % 2 == 1)
        {
            summonerIdList.sort(function () { return 0.5 - Math.random(); })
            summonerIdList.pop();
        }
        summonerIdList.forEach(function (element) {
            playerList.push(element.summonerID);
        }, this);
        // console.log(playerList);
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
            // console.log(name1 + ' gets ' + name2);
            matchedPairs.push({ player1: name1, player2: name2 });
            var index2 = playerList2.indexOf(name1);
            var index1 = playerList1.indexOf(name2);
            if (playerList2.indexOf(name1) >= 0) playerList2.splice(index2, 1);
            if (playerList1.indexOf(name2) >= 0) playerList1.splice(index1, 1);
        }
        createMatches(matchedPairs);
        console.log('MATCHED PAIRS', matchedPairs);
        callback(matchedPairs);
    });
};

function showTime (){
var week = new Date().getWeekNumber();
var year = new Date().getFullYear();
var startDate = getDateOfISOWeek(week, year);
var endDate = getDateOfISOWeek(week, year).addDays(7);
console.log(startDate);
console.log(endDate);
console.log(startDate.getTime());
console.log(endDate.getTime());
// console.log()
};
showTime();
// createMatchList((weeklyList) => {
//     // console.log(weeklyList);
// });

var createMatches = (matchedPairs, (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    matchedPairs.forEach(function (element) {
        // console.log(element);
        var matchInsert = new matchmakingModel({
            weekNumber: new Date().getWeekNumber(),
            players: [{
                summonerID: element.player1
            },
            {
                summonerID: element.player2
            }]
        });
        console.log(matchInsert);
        matchInsert.save(function (error) {
            if (error) throw error;
            console.log('MATCH INSERT');
        });
    }, this);
});

module.exports = {
    matchmaking,
    matchmakingModel,
    createMatchList
};

/* TODO:
(if not enough users for pairs, just give a random user a free win or a break this week)
2.Retreive match list of the first 5 ranked games (solo 5v5) after a certain point between a certain point.
*/

// var startDate = new Date("May 12, 2017 00:00:00"); // Your timezone!
// var startEpoch = startDate.getTime();
// console.log(startEpoch);

// var endDate = new Date("May 19, 2017 00:00:00"); // Your timezone!
// var endEpoch = endDate.getTime();
// console.log(endEpoch);
