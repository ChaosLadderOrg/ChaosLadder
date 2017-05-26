const { mongoose, Schema, db } = require('./mongoose.js');
const { getIdBySummoner } = require('./summoner.js');
const user = Schema({
    email: String,
    password: String,
    summonerID: Number,
    summonerName: String,
    region: String
});
const userModel = mongoose.model('users', user);

var createUser = (userEmail, userPassword, userSummonerName, userRegion, callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    getIdBySummoner(userSummonerName, (summonerId) => {
        var userInsert = new userModel({
            email: userEmail,
            password: userPassword,
            summonerID: summonerId,
            summonerName: userSummonerName,
            region: userRegion
        });
        console.log(userInsert);
        userInsert.save(function (error) {
            if (error) throw error;
            console.log('testing user insert');
        });
        callback(userInsert);
    });
};

var getAllUsers = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find().exec(function (error, userList) {
        callback(userList);
    });
};

module.exports = {
    user,
    userModel,
    createUser,
    getAllUsers
};