const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
const lolapi = require('./lolapi/lib/lolapi')(apiKey, 'euw');
/*
Contains summoner information - summoner name, ID, Region, Icon, runes  

TODO Main Functionality as modules:
1.Summoner profile - summoner name and region - user must enter their summoner name and region.
accept user input - summoner name = string, region select from dropdown, check if user exists, if yes confirm and proceed, 
if not, reject with error

2.Display summoner icons - maybe
*/
var getSummonerId = (summonerName, region, callback) => {
    //finds summonerId based on provided name
    lolapi.Summoner.getByName(summonerName, function (error, summoner) {
        if (error) {
            throw error;
        } else if (summonerName != null) {
            var summonerId = summoner[summonerName].id;
            callback(summonerId);
        };
    });
};

var getSummonerMatches = (summonerId, callback) => {
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
        var selectedMatchId = matches.matches[0].matchId;
        console.log(selectedMatchId);
        callback(selectedMatchId);
    });
};

var getTargetMatch = (selectedMatchId, callback) => {
    //returns match data based on the selectedMatchId
    lolapi.Match.get(selectedMatchId, function (error, match) {
        if (error) throw error;
        var playerIdentities = match.participantIdentities;
        // console.log(playerIdentities);
        callback(playerIdentities, match);
    });
};

var getMatchStats = (summonerId, playerIdentities, match, callback) => {
    //iterates over the match participants
    playerIdentities.forEach(function (element) {
        //searches for a matching summonerId 
        if (element.player.summonerId == summonerId) {
            var targetPlayerID = element.participantId - 1;
            console.log(targetPlayerID);
            var participantStats = match.participants[targetPlayerID].stats;

            var kills = participantStats.kills;
            var deaths = participantStats.deaths;
            var assists = participantStats.assists;
            var playerCs = participantStats.minionsKilled;
            var playerKDA = 'Kills: ' + kills + ', Deaths: ' + deaths + ', Assists: ' + assists + ' , Creep Score: ' + playerCs;
            callback(playerKDA);
        }
    }, this);
};

//export the functions
module.exports = {
    getSummonerId,
    getSummonerMatches,
    getTargetMatch,
    getMatchStats
};