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
    // console.log("connected to " + uri);

    User.find({}, 'summonerID').exec(function (error, data) {
        callback(data);
    });
    db.close();
};

module.exports = {
    getAllUsers,
    getSummonerId
};