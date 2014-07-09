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

    var youtubeCommands, oauth2Client, scopes, url;
    youtubeCommands = new Youtubecommands();
    oauth2Client = youtubeCommands.initiliazeOauth(req, res);

    scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/youtube'
    ];

    url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes.join(" ") // space delimited string of scopes
    });

    res.redirect(url);

});


module.exports = router;
