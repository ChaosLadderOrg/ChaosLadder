const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
const lolapi = require('lolapi')(apiKey, 'eune');

var summonerId;
var targetPlayerID;
var participantStats;
console.log('Starting summoner.js...');

/*
Contains summoner information - summoner name, ID, Region, Icon, runes  

TODO Main Functionality as modules:
1.Summoner profile - summoner name and region - user must enter their summoner name and region.
accept user input - summoner name = string, region select from dropdown, check if user exists, if yes confirm and proceed, 
if not, reject with error

2.Display summoner icons - maybe
*/
var getSummonerId = (summonerName, region) => {

    //finds summonerId based on provided name
    lolapi.Summoner.getByName(summonerName, function (error, summoner) {
        if (error) {
            throw error;
        } else if (summonerName != null) {
            summonerId = summoner[summonerName].id;
            console.log(summonerId);

            var options = {
            // championIds: 412,
            // rankedQueues: ['RANKED_SOLO_5X5'],
                beginIndex: 0,
                endIndex: 2
            };

            //returns the specified range of matches based on summonerId
            lolapi.MatchList.getBySummonerId(summonerId, options, function (error, matches) {
                if (error) throw error;
                var selectedMatchId = matches.matches[0].matchId;

                //returns match data based on the selectedMatchId
                lolapi.Match.get(selectedMatchId, function (callback, match) {
                    if (error) throw error;

                    var playerIdentities = match.participantIdentities;

                    //iterates over the match participants
                    playerIdentities.forEach(function (element) {
                        //searches for a matching summonerId 
                        if (element.player.summonerId == summonerId) {
                            targetPlayerID = element.participantId - 1;
                            console.log(targetPlayerID);
                            participantStats = match.participants[targetPlayerID].stats;
                            console.log(participantStats);

                        } else if (error) {
                            throw error;
                        }
                    }, this);

                });
            });
        };
    });
};
module.exports = { getSummonerId };