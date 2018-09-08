var http = require("http");

const express = require('express')
const app = express();

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'ba88dc9350c3444c8928d60d30038157',
    clientSecret: 'd64dbbee9e6446efbcf5321dfb312678',
    redirectUri: 'localhost:3000'
});

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var db = null;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
  if(err) {
    console.log(err);
  }
  db = client.db('Songs');
});




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function (req, res) {
    res.send('root');
});

app.get('/search/:song', function (req, res) {
    spotifyApi.clientCredentialsGrant().then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
    
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    });    
    spotifyApi.searchTracks(req.params.song).then(function (data) {
        var songs = [];
        for (var track of data.body.tracks.items) {
            songs.push(track);
        }
        res.send(songs);
    }, function (err) {
        res.send(err);
    });
});

app.get('/add/:song', function(req, res) {
    if()

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))