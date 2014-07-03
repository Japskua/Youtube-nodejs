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

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    var scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/youtube'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes.join(" ") // space delimited string of scopes
    });

    res.redirect(url);

});


module.exports = router;
