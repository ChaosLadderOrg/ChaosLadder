const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
var region = 'euw';
const lolapi = require('./lolapi/lib/lolapi')(apiKey, region);

var kdaList = [];
var getSummonerNameById = function (summonerId) {
    lolapi.Summoner.getName(summonerId, (error, summoner) => {
        if (error) {
            throw error;
        } else if (summonerId != null) {
            var summonerName = summoner[summonerId];
            console.log(summonerName)
            return summonerName;
        };
    });
};

var getIdBySummoner = (summonerName, data) => {
    var summonerId;
    //finds summonerId based on provided name
    lolapi.Summoner.getByName(summonerName, (error, summoner) => {
        if (error) {
            throw error;
        } else if (summonerName != null) {
            summonerId = summoner[summonerName].id;
            data(summonerId);
        };
    });
};

//Get a specific match's data
var getMatchBySummonerId = (summonerId, callback) => {
    var options = {
        beginIndex: 0,
        endIndex: 5
    };
    //returns the specified range of matches based on summonerId
    lolapi.MatchList.getBySummonerId(summonerId, options, (error, matchList) => {
        if (error) throw error;
        var matchId = matchList.matches[0].matchId;
        callback(matchId);
    });
};

//Get a range of matches and their data
var getMatchesBySummonerId = (summonerId, callback) => {
    var options = {
        // championIds: 412,
        // rankedQueues: ['RANKED_SOLO_5X5'],
        // beginTime: 1494540000000,
        // endTime: 1495144800000,
        beginIndex: 0,
        endIndex: 5
    };
    //returns the specified range of matches based on summonerId
    lolapi.MatchList.getBySummonerId(summonerId, options, (error, matchList) => {
        if (error) throw error;
        var matches = matchList.matches;
        var matchIds = [];
        matches.forEach(function (element) {
            matchIds.push(element.matchId);
            // matchIds[element].push(matches.matchId);
        }, this);
        console.log(matchIds);
        callback(matchIds);
    });
};

var getMatchData = (matchId, callback) => {
    //returns match data based on the selectedMatchId
    lolapi.Match.get(matchId, (error, match) => {
        if (error) throw error;
        var targetMatch = match;
        var playerIdentities = match.participantIdentities;
        callback(playerIdentities, targetMatch);
    });
};

var getAllPlayerMatchesStats = (matchIds, summonerId, callback) => {
    matchIds.forEach(function (element) {
        var matchId = element;
        lolapi.Match.get(matchId, (error, match) => {
            if (error) throw error;
            var targetMatch = match;
            var playerIdentities = match.participantIdentities;
            getStatsById(summonerId, playerIdentities, targetMatch, (matchStats) => {
                callback(matchStats);
            });
        });
    }, this);
};

var getStatsById = (summonerId, playerIdentities, targetMatch, callback) => {
    //iterates over the match participants
    playerIdentities.forEach(function (element) {
        //searches for a matching summonerId 
        if (element.player.summonerId == summonerId) {
            var targetPlayerID = element.participantId - 1;
            console.log('TARGET PLAYER ID:', targetPlayerID);
            var participantStats = targetMatch.participants[targetPlayerID].stats;
            var kills = participantStats.kills;
            var deaths = participantStats.deaths;
            var assists = participantStats.assists;
            var playerCs = participantStats.minionsKilled;

            var playerScore = 'Kills: ' + kills + ', Deaths: ' + deaths + ', Assists: ' + assists + ' , Creep Score: ' + playerCs;
            console.log(playerScore);
            var playerkda = Math.round((kills + assists) / deaths * 100) / 100;
            kdaList.push(playerkda);

            if (kdaList.length == 5) { callback(kdaList); };
        }
    }, this);
};

var summonerWeeklyKda = (kdaList, callback) => {
    /* return the weekly summoner kda based on the overall KDA*/
    var weeklyKda = kdaList.reduce(function (a, b) { return a + b; }, 0);
    weeklyKda = Math.round(weeklyKda * 100) / 100;
    callback(weeklyKda);
};

var getSummonerStats = (summonerName, callback) => {
    getIdBySummoner(summonerName, (summonerId) => {
        // console.log('SUMMONER ID:', summonerId);
        getMatchBySummonerId(summonerId, (matchList) => {
            // console.log('MATCH LIST IDS:', matchList);
            getMatchData(matchList, (matchId, targetMatch) => {
                // console.log('GET MATCH DATA:', matchId);
                getStatsById(summonerId, matchId, targetMatch, (playerStats) => {
                    console.log('PLAYER STATS BY ID:', playerStats);
                    callback(playerStats);
                });
            });
        });
    });
};

var getWeeklySummonerStats = (summonerName, callback) => {
    getIdBySummoner(summonerName, (summonerId) => {
        console.log('SUMMONER ID:', summonerId);
        getMatchesBySummonerId(summonerId, (matchList) => {
            console.log('MATCH LIST IDS:', matchList);
            getAllPlayerMatchesStats(matchList, summonerId, (stats) => {
                console.log('GET MATCH DATA:', stats);
                summonerWeeklyKda(stats, (weeklyKda) => {
                    console.log('WEEKLY KDA:', weeklyKda);
                    callback(weeklyKda)
                });
            });
        });
    });
};

//export the functions
module.exports = {
    region,
    getIdBySummoner,
    getMatchBySummonerId,
    getMatchData,
    getStatsById,
    getSummonerStats,
    getSummonerNameById
};