console.log('Starting application...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const argv = yargs.argv;


var lolapi = require('lolapi')('RGAPI-c9db71b0-bb76-414b-af32-37030983e82b', 'eune');
 
var summonerName = 'oliwer94';
lolapi.Summoner.getByName(summonerName, function (error, summoner) {
  if (error) throw error;
  /* summoner object
  { wickd:
    {
      id: 71500,
      name: 'Wickd',
      profileIconId: 613,
      summonerLevel: 30,
      revisionDate: 1408199475000
    }
  } */
  console.log(summoner);

//   var summonerId = summoner[summonerName].id;
  
//   lolapi.Summoner.getRunes(summonerId, function (error, runes) {
//     if (error) throw error;
//     console.log(runes);
//     // do something with runes
//   })
});

lolapi.Champion.getAll({ freeToPlay: true }, function (error, champion) {
  // print free to play champions
  // console.log(champion.champions);

  var champList = champion.champions;
  var arr = [];

  champList.forEach(function(element) {
    arr.push(element.id);
  }, this);

// print champion ids from our arraylist
  console.log(arr);
 
// options for the getChampion method
var options = {
  dataById: true, 
  champData: 'altimages'
};

//TODO make a for-each loop to iterate through arr and pass it to the getChampion
champId = arr[1];

lolapi.Static.getChampion(champId, options, function (error, champion) {
  // log the champion data from the passed in Id
//  if (error) throw error;
    console.log(champion);
}); 

});


console.log('***Finished running application!***');