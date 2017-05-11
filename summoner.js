var region = 'eune';
const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
const lolapi = require('lolapi')(apiKey, region);

console.log('Starting summoner.js...');

/*
Contains summoner information - summoner name, ID, Region, Icon, runes  

TODO Main Functionality as modules:
1.Summoner profile - summoner name and region - user must enter their summoner name and region.
accept user input - summoner name = string, region select from dropdown, check if user exists, if yes confirm and proceed, 
if not, reject with error

2.Display summoner icons - maybe
*/

module.exports.findSummoner = (summonerName) => {

    console.log('Saying Hello from findSummoner in summoner.js!');

    lolapi.Summoner.getByName(summonerName, function (error, summoner) {

        if(error) {
            throw error;
        } else if (summonerName != null) {
             var summonerId = summoner[summonerName].id
            console.log(summonerId);

        var options = {
            // championIds: 412,
            // rankedQueues: ['RANKED_SOLO_5X5'],
            beginIndex: 0,
            endIndex: 2
            };

        lolapi.MatchList.getBySummonerId(summonerId, options, function (error, matches) {
            // got the matches!
            if (error) throw error;
            console.log(matches);
            });
        }

    });
    return 'New note';
};