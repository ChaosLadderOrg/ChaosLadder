// const _ = require('lodash');
// const yargs = require('yargs');
// const argv = yargs.argv;

const express = require('express');
var app = express();
var bodyParser = require('body-parser')


const { getSummonerStats, getWeeklySummonerStats } = require('./summoner.js');
const { createUser } = require('./user.js');
const { createMatchList } = require('./matchmaking.js');

var email = 'liko@liko.com';
var password = '123eerr11';
var sumName = 'hellking007';
var accountRegion = 'euw';

// getWeeklySummonerStats(sumName, (stats) => {
//         console.log(stats);
//          });

// createUser(email, password, sumName, accountRegion, (confirmation) => {
//         console.log(confirmation);
//          });
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.post('/createuser', (req, res) => {
        console.log(req.body);
        createUser(req.body.email, req.body.pass, req.body.sumName, req.body.region, (confirmation) => {
                console.log(confirmation);
                res.status(200)//.send('CREATE USER CALLBACK', confirmation);

        });
});

app.get('/getstats', (req, res) => {
        getWeeklySummonerStats(sumName, (stats) => {
                console.log(stats);
                res.status(200);
                res.json(stats);
        });
});

app.get('/creatematches', (req, res) => {
        createMatchList((matchlist) => {
                console.log(matchlist);
                res.status(200).send(matchlist);
        });
});


app.listen(3000, () => {
        console.log('Server is up on port 3000!');
});

/*
TODO Main Functionality as modules:
2.Match list of the first ranked 5 games (solo 5v5) after a certain point. +++++
3.Retrieve champion information and store it in JSON file
4.Display champion pictures

6.Create Leaderboard based on the players who sign up for the tournament
7.KDA, points and etc. estimator +++++
8.Create matchmaking system, which every week places two players against each other. +++++

a)TODO make a for-each loop to iterate through arr and pass it to the getChampion
*/

// //   var summonerId = summoner[summonerName].id;

// //   lolapi.Summoner.getRunes(summonerId, function (error, runes) {
// //     if (error) throw error;
// //     console.log(runes);
// //     // do something with runes
// //   })
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

// lolapi.Stats.getSummary(summonerId, function (error, summary) {
//                     if (error) throw error;
//                     console.log(summary);
//                 });