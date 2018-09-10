var http = require("http");

const express = require('express');
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
    if (err) {
        console.log(err);
    }
    db = client.db('Songs');
    db.createCollection("songs", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Collection songs created");
        }
    });
});

app.use(function (req, res, next) {
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
    spotifyApi.searchTracks(req.params.song, {limit: 10}).then(function (data) {
        var songs = [];
        for (var track of data.body.tracks.items) {
            songs.push(track);
        }
        res.send(songs);
    }, function (err) {
        res.send(err);
    });
});

app.post('/add', urlencodedParser, function (req, res) {
    var songName;
    var imgUrl;
    var spotifyUrlHref;
    var artists;
    console.log(req.body.spotifyId);
    spotifyApi.getTrack(req.body.spotifyId).then(function (data) {
        console.log(data.body.artists);
        songName = data.body.name;
        imgUrl = data.body.album.images[0].url;
        spotifyUrlHref = data.body.external_urls.spotify;
        artists = data.body.artists;
        db.collection("songs").insertOne({
            _id: req.body.spotifyId,
            name: songName,
            spotifyUrl: spotifyUrlHref,
            image: imgUrl,
            similarSongs: [],
            artists: artists
        }, function (err, result) {
            if (err) {
                console.log(songName + " already exists");
                res.send(songName + " already exists")
            } else {
                console.log("Added " + songName + " to songs");
                res.send("Added " + songName + " to songs")
            }
        });
    }, function (err) {
        console.log(err);
    });
    console.log(songName);
   
});

app.get('/song/:songId', function(req, res) {
    console.log("accessed at "+ req.params.songId);
    db.collection("songs").findOne({ _id: req.params.songId }, function(err, result) {
        if(err) { 
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))