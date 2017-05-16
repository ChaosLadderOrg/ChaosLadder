const { getAllUsers, getSummonerId } = require('./mongoose.js');
var playerList = [];

getAllUsers((usersList) => {
    // console.log(usersList);
});

getSummonerId((summonerIdList) => {
    // console.log(summonerIdList[0].summonerID);

});

var createMatchList = (callback) => {

    getSummonerId((summonerIdList) => {
        // console.log(summonerIdList);

        summonerIdList.forEach(function (element) {
            playerList.push(element.summonerID);
        }, this);
        console.log(playerList);

        // var weeklyMatches = [{ type: "Volvo", year: 2016 },
        // { type: "Saab", year: 2001 },
        // { type: "BMW", year: 2010 }];


        var playerList1 = playerList.slice(),
            playerList2 = playerList.slice();

        playerList1.sort(function () { return 0.5 - Math.random(); });
        playerList2.sort(function () { return 0.5 - Math.random(); });

        while (playerList1.length) {
           var name1 = playerList1.pop();
            var name2 = playerList2[0];
            if (name2 == name1){
                name2 = playerList2.pop();
            }
            playerList2.shift();
            console.log(name1 + ' gets ' + name2);
            var index2 = playerList2.indexOf(name1);
            var index1 = playerList1.indexOf(name2);
            if (playerList2.indexOf(name1) >= 0) playerList2.splice(index2, 1);
            if (playerList1.indexOf(name2) >= 0) playerList1.splice(index1, 1);
        }

    });
};

createMatchList((weeklyList) => {
    console.log(weeklyList);
});

module.exports = {
    createMatchList
};

/* TODO:
1.Create a matchmaing system based on the users in the tournament ladder 
(if not enough users for pairs, just give a random user a free win or a break this week)
2.Retreive match list of the first 5 ranked games (solo 5v5) after a certain point between a certain point.
*/

// var startDate = new Date("May 12, 2017 00:00:00"); // Your timezone!
// var startEpoch = startDate.getTime();
// console.log(startEpoch);

// var endDate = new Date("May 19, 2017 00:00:00"); // Your timezone!
// var endEpoch = endDate.getTime();
// console.log(endEpoch);

// players.forEach(function (element) {
//     //searches for a matching summonerId 
//     if (element.summonerName) {
//         var targetPlayerID = element.participantId - 1;

//     };
// });
