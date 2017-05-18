const { Schema, db, userModel } = require('./mongoose.js');
const user = Schema({
    email: String,
    password: String,
    summonerID: Number,
    summonerName: String,
    region: String
});

// var createUser = (userEmail, userPassword, userSummonerName, userRegion, callback) => {
//     db.on('error', console.error.bind(console, 'connection error:'));

//     var userInsert = new userModel({
//         email: userEmail,
//         password: userPassword,
//         summonerID: getSummonerId(userSummonerName),
//         summonerName: userSummonerName,
//         region: userRegion
//     });
//     console.log(userInsert);
//     userInsert.save(function (error) {
//         if (error) throw error;
//         console.log('testing user insert');
//     });
// };

var getAllUsers = (callback) => {
    db.on('error', console.error.bind(console, 'connection error:'));
    userModel.find().exec(function (error, userList) {
        callback(userList);
    });
};