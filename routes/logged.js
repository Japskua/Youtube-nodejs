/**
 * Created by Janne on 2.7.2014.
 */


var express = require('express');
var router = express.Router();
var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2;
var youtubecommands = require('./youtube/youtube-commands.js');

/* GET home page. */
router.get('/', function(req, res) {

    // Get the parameters
    console.log('Request query parameters are:', req.query);

    // Get the code from the callback
    var code = req.query.code;

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    oauth2Client.getToken(code, function(err, tokens) {
        // contains an access_token and optionally a refresh_token.
        // save them permanently.

        var accessToken = tokens.access_token;
        var refreshToken = tokens.refresh_token;

        res.send("Logged in and the tokens are:\nAccess Token:" + accessToken + "\nRefresh Token:" + refreshToken);
    });



});

module.exports = router;