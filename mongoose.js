const mongoose = require('mongoose');
const uri = 'mongodb://ladder:password@ds133981.mlab.com:33981/chaosladder';
const Schema = mongoose.Schema;
const db = mongoose.connection;
mongoose.connect(uri);
mongoose.Promise = global.Promise;

const userModel = mongoose.model('users', user);
const matchmakingModel = mongoose.model('matchmaking', matchmaking);


module.exports = {
    Schema,
    db,
    userModel,
    matchmakingModel
};