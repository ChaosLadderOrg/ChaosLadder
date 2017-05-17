const mongoose = require('mongoose');
const uri = 'mongodb://ladder:password@ds133981.mlab.com:33981/chaosladder';
mongoose.connect(uri);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const user = mongoose.Schema({
    email: String,
    password: String,
    summonerID: Number,
    summonerName: String,
    region: String
});

const matchmaking = mongoose.Schema({
    weekNumber: Number,
    players: [{
        summonerID: Number,
        summonerName: String,
        kills: Number,
        assists: Number,
        deaths: Number,
        creepScore: Number,
        winner: Boolean
    }]
});

var getAllUsers = (callback) => {
    var db = mongoose.connection;
    var User = mongoose.model('users', user);
    db.on('error', console.error.bind(console, 'connection error:'));
    // console.log("connected to " + uri);

    User.find().exec(function (error, data) {
        // console.log(data);
        callback(data);
    });
    db.close();
};

var getSummonerId = (callback) => {
    var db = mongoose.connection;
    var User = mongoose.model('users', user);
    db.on('error', console.error.bind(console, 'connection error:'));
    User.find({}, 'summonerID').exec(function (error, data) {
        callback(data);
    });
    db.close();
};

var createMatches = (matchPairs, callback) => {
    var db = mongoose.connection;
    var match = mongoose.model('matchmaking', matchmaking);
    db.on('error', console.error.bind(console, 'connection error:'));
    var saves = [];
    matchPairs.forEach(function (element) {
        console.log(element);
        var matchInsert = new match({
            weekNumber: 1,
            players: [{
                summonerID: element.player1
            },
            {
                summonerID: element.player2
            }]
        }).save()
            .then((err) => {
                console.log(err.message);
            })
            .catch((err) => {
                console.log(err.message);
            });

        console.log(matchInsert);
        //   for (var matchup in matchInsert) {
        //         new match({
        //             weekNumber: 1,
        //             players: [{
        //                 summonerID: element.player1
        //             },
        //             {
        //                 summonerID: element.player2
        //             }]
        //         }).save()
        //             .catch((err) => {
        //                 console.log(err.message);
        //             });
        //     }



        // matchInsert.save(function (error) {
        //     if (error) throw error;
        //     console.log('test');
        // });
    }, this);

    // User.find({}, 'summonerID').exec(function (error, data) {
    //     callback(data);
    // });
    db.close();
};

module.exports = {
    getAllUsers,
    getSummonerId,
    createMatches
};