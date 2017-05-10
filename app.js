console.log('Starting application...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const summoner = require('./summoner.js');
const argv = yargs.argv;
const apiKey = 'RGAPI-c9db71b0-bb76-414b-af32-37030983e82b';
const lolapi = require('lolapi')(apiKey, 'eune');

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
console.log(summoner.findSummoner(summonerName));

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

// var options = {
//   // championIds: 412,
//   // rankedQueues: ['RANKED_SOLO_5X5'],
//   beginIndex: 0,
//   endIndex: 1
// }; // these options will return 10 ranked 5v5 games containing champion Thresh
// lolapi.MatchList.getBySummonerId(24670397, options, function (error, matches) {
//   // got the matches!
//   if (error) throw error;
//   console.log(matches);
// });

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