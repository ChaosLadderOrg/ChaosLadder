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

var createUser = (userEmail, userPassword, userSummonerName, userRegion, callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
  
    var userInsert = new userModel({
        email: userEmail,
        password: userPassword,
        summonerID: getSummonerId(userSummonerName),
        summonerName: userSummonerName,
        region: userRegion
    });
    console.log(userInsert);
    userInsert.save(function (error) {
        if (error) throw error;
        console.log('testing user insert');
    });
};

var getAllUsers = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find().exec(function (error, userList) {
        callback(userList);
    });
};

var getSummonerId = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find({}, 'summonerID').exec(function (error, summonerId) {
        callback(summonerId);
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
            console.log('test match insert');
        });
    }, this);
};

module.exports = {
    getAllUsers,
    getSummonerId,
    createUser,
    createMatches
};