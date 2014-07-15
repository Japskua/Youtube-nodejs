/**
 * Created by Janne on 2.7.2014.
 */
"use strict";


var express = require('express');
var router = express.Router();
var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2;
var Youtubecommands = require('./youtube/youtube-commands.js');

/* GET home page. */
router.get('/', function (req, res) {

    // Get the parameters
    console.log('Request query parameters are:', req.query);

    // Get the code from the callback
    var code, youtubeCommands, oauth2Client;

    code = req.query.code;

    console.log("logged.js>> The cookie tokens are:", req.signedCookies.tokens);

    youtubeCommands = new Youtubecommands();
    oauth2Client = youtubeCommands.initiliazeOauth(req, res);

    oauth2Client.getToken(code, function (err, tokens) {
        // contains an access_token and optionally a refresh_token.
        // save them permanently.

        // Save the tokens as cookie, signed
        res.cookie('tokens', tokens, {signed: true});

        res.send("Logged in!");
    });



});

module.exports = router;