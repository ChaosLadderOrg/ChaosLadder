console.log('Starting application...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const argv = yargs.argv;
const summoner = require('./summoner.js');
var region = 'eune';
const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
const lolapi = require('lolapi')(apiKey, region);


/*
TODO Main Functionality as modules:
2.Match list of the first ranked 5 games (solo 5v5) after a certain point.
3.Retrieve champion information and store it in JSON file
4.Display champion pictures

6.Create Leaderboard based on the players who sign up for the tournament
7.KDA, points and etc. estimator
8.Create matchmaking system, which every week places two players against each other.

a)TODO make a for-each loop to iterate through arr and pass it to the getChampion
*/

var summonerName = 'oliwer94';
// console.log(summoner.findSummoner(summonerName));
var summonerID = summoner.findSummoner(summonerName);
console.log(summonerID);

// summoner.findSummoner(summonerName, 'eune')

// lolapi.Summoner.getByName(summonerName, function (error, summoner) {
//   if (error) throw error;
//   /* summoner object
//   { wickd:
//     {
//       id: 71500,
//       name: 'Wickd',
//       profileIconId: 613,
//       summonerLevel: 30,
//       revisionDate: 1408199475000
//     }
//   } */
//   console.log(summoner);

// //   var summonerId = summoner[summonerName].id;

// //   lolapi.Summoner.getRunes(summonerId, function (error, runes) {
// //     if (error) throw error;
// //     console.log(runes);
// //     // do something with runes
// //   })



//TODO: take the champion id of the player whose stats we want, locate the corresponding champion id and retrieve stats 
var options = {
  // championIds: 412,
  // rankedQueues: ['RANKED_SOLO_5X5'],
  beginIndex: 0,
  endIndex: 1
}; // these options will return 10 ranked 5v5 games containing champion
lolapi.MatchList.getBySummonerId(summonerID, options, function (error, matches) {
  // got the matches!
  if (error) throw error;
//   console.log(matches);
    selectedMatchId = matches[0].matchId;

    lolapi.Match.get(selectedMatchId, function (callback, match){
        if (error) throw error;
        // console.log(match);

        // returns the list of all 10 participants
        //TODO: Utilize summoner.js>summonerId, find matching case in playerIdentities
        var playerIdentities = match.participantIdentities;
        /* Returns in the following format 
            { participantId: 9, dSeasonTier: 'DIAMOND',
            player: ine: [Object],
            { summonerId: 24670397,
            summonerName: 'oliwer94',
            matchHistoryUri: '/v1/stats/player_history/EUN1/29223707',
            profileIcon: 710 } }
        */
        //retreive the first participants stats
        // var playerId = 9;
        var participantStats = match.participants[summonerID].stats;
        
        // participantStats.championId[18].stats;
        // console.log(participantStats,null,3);
        console.log(participantStats);
    });

});

// });

// lolapi.Champion.getAll({ freeToPlay: true }, function (error, champion) {
//   // print free to play champions
//   // console.log(champion.champions);

//   var champList = champion.champions;
//   var arr = [];

//   champList.forEach(function (element) {
//     arr.push(element.id);
//   }, this);

//   // print champion ids from our arraylist
//   console.log(arr);

//   // options for the getChampion method
//   var options = {
//     dataById: true,
//     champData: 'image'
//   };

//   champId = arr[0];

//   lolapi.Static.getChampion(236, options, function (error, champion) {
//     // log the champion data from the passed in Id
//     if (error) throw error;
//     console.log(champion);
//   });

// });

console.log('***Finished running application!***');