const mongoose = require('mongoose');
const uri = 'mongodb://ladder:password@ds133981.mlab.com:33981/chaosladder';
mongoose.connect(uri);
mongoose.Promise = global.Promise;
const { createMatchList } = require('./matchmaking.js');
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

var createMatches = (createMatchList, (callback) => {
    var db = mongoose.connection;
    var match = mongoose.model('matchmaking', matchmaking);
    db.on('error', console.error.bind(console, 'connection error:'));
    // console.log("connected to " + uri);

    var match = new matchmaking({
        weekNumber: 1,
        players: [{
            summonerID: player1
        },
        {
            summonerID: player2
        }]
    });

    match.save(function (error) {
        if (error) throw error;
    });

    User.find({}, 'summonerID').exec(function (error, data) {
        callback(data);
    });
    db.close();
});

module.exports = {
    getAllUsers,
    getSummonerId
};