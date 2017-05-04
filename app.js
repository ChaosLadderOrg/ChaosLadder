console.log('Starting application...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;


console.log('***Finished running application!***')

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
  var summonerId = summoner[summonerName].id;
  lolapi.Summoner.getRunes(summonerId, function (error, runes) {
    if (error) throw error;
    console.log(runes);
    // do something with runes
  })
});
