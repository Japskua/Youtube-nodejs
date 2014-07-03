/**
 * Created by Janne on 2.7.2014.
 */



var express = require('express');
var router = express.Router();
var googleapis = require('googleapis');
var youtubecommands = require('./youtube/youtube-commands.js');

/**
 * GET playlists.
 */
router.get('/playlists', function(req, res) {

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    // Try getting g+ info
    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client) {


            youtubeCommands.getPlaylists(client, oauth2Client, function(err, result) {
                if(err) {
                    youtubeCommands.CheckForErrorType(err, res);
                    return;
                }

                res.send(result);

            });
        });

});


/* GET Playlist Items. */
router.get('/playlistItems', function(req, res) {

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    // Try getting g+ info
    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client) {

            youtubeCommands.getPlaylistItems(client, oauth2Client, "PLX0jcZ2eQoOa6AISCWiwNAWSlNVVSup5W", function(err, result) {
                if(err) {
                    youtubeCommands.CheckForErrorType(err, res);
                    return;
                }

                res.json(result);

            });
        });

});

/* GET video. */
router.get('/videos', function(req, res) {

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    // Try getting g+ info
    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client) {

            youtubeCommands.getVideos(client, oauth2Client, "JyLL-95IjzA", function(err, result) {
                if(err) {
                    youtubeCommands.CheckForErrorType(err, res);
                    return;
                }

                res.send(result);

            });
        });

});

/* GET Upload page for videos */
router.get('/upload', function(req, res) {

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client) {

            // Create the metadata
            var metadata = youtubeCommands.createMetadata("TestUpload",
                                          "Testing how well the upload works",
                                          "unlisted",
                                          ["test","upload"]);

            // And then upload the video
            youtubeCommands.uploadVideo(client, oauth2Client, metadata, "nauhoite.mp4", function(err, result) {
                if (err) {
                    youtubeCommands.CheckForErrorType(err, res);
                    return;
                }

                // Get the videoId
                var videoId = result.id;

                console.log(result);

                youtubeCommands.insertToPlaylist(client, oauth2Client, "PLX0jcZ2eQoOa6AISCWiwNAWSlNVVSup5W", videoId, function(err, insertResult) {
                    if (err) {
                        youtubeCommands.CheckForErrorType(err, res);
                        return;
                    }
                    // Otherwise, things okay. Send the result
                    res.send(insertResult);
                });

            });

        });


});


/* GET Upload page for videos */
router.get('/changePlaylist/:id', function(req, res) {

    console.log(req.params);

    var videoId = req.params.id;

    var youtubeCommands = new youtubecommands();
    var oauth2Client = youtubeCommands.initiliazeOauth();

    googleapis
        .discover('youtube', 'v3')
        .execute(function(err, client) {


            youtubeCommands.insertToPlaylist(client, oauth2Client, "PLX0jcZ2eQoOa6AISCWiwNAWSlNVVSup5W", videoId, function(err, insertResult) {
                if (err) {
                    youtubeCommands.CheckForErrorType(err, res);
                    return;
                }

                // Otherwise, things okay. Send the result
                res.send(insertResult);
            });
        });
});


module.exports = router;