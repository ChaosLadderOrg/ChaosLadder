const mongoose = require('mongoose');
const uri = 'mongodb://ladder:password@ds133981.mlab.com:33981/chaosladder';
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
const db = mongoose.connection;
const userModel = mongoose.model('users', user);
const matchmakingModel = mongoose.model('matchmaking', matchmaking);

mongoose.connect(uri);
mongoose.Promise = global.Promise;

var getAllUsers = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find().exec(function (error, data) {
        callback(data);
    });
};

var getSummonerId = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find({}, 'summonerID').exec(function (error, data) {
        callback(data);
    });
};

var createMatches = (matchedPairs, callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    matchedPairs.forEach(function (element) {
        // console.log(element);
        var matchInsert = new matchmakingModel({
            weekNumber: 1,
            players: [{
                summonerID: element.player1
            },
            {
                summonerID: element.player2
            }]
        });
        console.log(matchInsert);
        matchInsert.save(function (error) {
            if (error) throw error;
            console.log('test');
        });
    }, this);
};

module.exports = {
    getAllUsers,
    getSummonerId,
    createMatches
};