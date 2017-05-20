const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
var region = 'euw';
const lolapi = require('./lolapi/lib/lolapi')(apiKey, region);

var getIdBySummoner = (summonerName, data) => {
    var summonerId;
    //finds summonerId based on provided name
    lolapi.Summoner.getByName(summonerName, (error, summoner) => {
        if (error) {
            throw error;
        } else if (summonerName != null) {
            summonerId = summoner[summonerName].id;
            data(summonerId);//THIS IS A MAJOR ISSUE DUE TO THE CALLBACK/API ASYNC
        };
        //  callback(summonerId);
    });
};

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
    lolapi.MatchList.getBySummonerId(summonerId, options, (error, matches) => {
        if (error) throw error;
        var matchId = matches.matches[0].matchId;
        callback(matchId);
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
            
            var playerKDA = 'Kills: ' + kills + ', Deaths: ' + deaths + ', Assists: ' + assists + ' , Creep Score: ' + playerCs;
            callback(playerKDA);
        }
    }, this);
};

var getSummonerStats = (summonerName, callback) => {
    var stats;
    getIdBySummoner(summonerName, (summonerId) => {
        // console.log('SUMMONER ID:', summonerId);
        getMatchesBySummonerId(summonerId, (matchList) => {
            // console.log('MATCH LIST IDS:', matchList);
            getMatchData(matchList, (matchId, targetMatch) => {
                // console.log('GET MATCH DATA:', matchId);
                getStatsById(summonerId, matchId, targetMatch, (playerStats) => {
                    console.log('PLAYER STATS BY ID:', playerStats);
                    stats = playerStats;
                    callback(stats);
                });
            });
        });
    });
    // console.log('RETURN CALL OF STATS:', stats);
};


//export the functions
module.exports = {
    region,
    getIdBySummoner,
    getMatchesBySummonerId,
    getMatchData,
    getStatsById,
    getSummonerStats
};