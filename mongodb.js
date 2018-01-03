var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const debug = require('debug')('mongodb');
var mongoDB = require('mongodb');
// Database Name
const dbName = 'spotify';

// Connection URL
const url = 'mongodb://localhost:27017/' + dbName;

function connectToMongo(fn){
    // Use connect method to connect to the server
    var mongoClient = MongoClient;

    mongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        debug('successfully connected to the server');   
        fn(mongoClient);
    });    
}

module.exports.storeTokens = function (refreshToken, accessToken){
    connectToMongo((mongoClient) => {
        var obj = {
            refreshToken : refreshToken,
            accessToken : accessToken
        }
        const db = MongoClient.db(dbName);
        db.collection('tokens').insert(obj, (err, res) =>{
            assert.equal(null, err);
            debug('added the refresh token to the database: ' + obj.refreshToken);
            debug('added the access token to the database: ' + obj.accessToken);
            db.close();
            mongoClient.close();
        
        })
    })
}

module.exports.getTokens = function(){
    connectToMongo((mongoClient) => {
        var obj = {
            refreshToken : refreshToken,
            accessToken : accessToken
        }
        const db = mongoClient.db(dbName);
        db.collection('tokens').find();
    })
}

