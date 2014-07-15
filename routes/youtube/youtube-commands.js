/**
 * Created by Janne on 3.7.2014.
 */
"use strict";

var fs = require('fs');
var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2;

var Config = require('./../../config.js');

/**
 * The constructor for creating the YoutubeCommands class
 * @constructor
 */
function YoutubeCommands() {
    // Just the constructor
    this.name = "YoutubeCommands";
}

/**
 * Checks for Error Type from the received Youtube API response
 * @param err
 * @param res
 * @constructor
 */
YoutubeCommands.prototype.CheckForErrorType = function (err, res) {
    if (err.errors.reason === "authError") {
        res.redirect("http://localhost:3000/login");
    }

    // Otherwise, just respond with an error
    res.send("An error occurred", err);
};

/**
 * Creates the metadata for inserting a new video
 * @param {String} title The title of the video
 * @param {String} description The description of the video to be inserted
 * @param {String} privacyStatus The privacy status to be given to the video (private, unlisted, public)
 * @param {Array} tags An array of tags that should be inserted
 * @returns {{snippet: {title: *, description: *, tags: *}, status: {privacyStatus: *}}}
 */
YoutubeCommands.prototype.createMetadata = function (title, description, privacyStatus, tags) {

    return {
        snippet : { title : title, description : description, tags : tags},
        status : { privacyStatus : privacyStatus}
    };

};

/**
 * Uploads the video from the given location to youtube
 * @param client The client information
 * @param authClient the authentication information
 * @param metadata The metadata to add when uploading the file
 * @param {String} video the path to the video
 * @param {Function} callback The callback
 */
YoutubeCommands.prototype.uploadVideo = function (client, authClient, metadata, video, callback) {

    client
        .youtube.videos.insert({ part : 'snippet, status, player'}, metadata)
        .withMedia('video/mp4', fs.readFileSync(video))
        .withAuthClient(authClient)
        .execute(callback);

};

/**
 * Gets the video information of the given ID
 * @param client The connection client
 * @param authClient The authorization information
 * @param {String} videoId The ID of the video in question
 * @param {Function} callback The callback function
 */
YoutubeCommands.prototype.getVideos = function (client, authClient, videoId, callback) {

    client
        .youtube.videos.list({ part : "id, snippet, status, player",
            id : videoId})
        .withAuthClient(authClient)
        .execute(callback);
};

/**
 * Checks for signup tokens from the client. If not found, will redirect to login page
 * @param req Request data
 * @param res Response data
 */
YoutubeCommands.prototype.checkForTokens = function (req, res) {

    console.log("Checking for the tokens");

    // Check if the tokens are undefined
    if (req.signedCookies.tokens === undefined) {
        console.log("The tokens are undefined");
        // In which case, redirect to login page
        return false;
    }

    // Otherwise, the tokens are not undefined
    console.log("The tokens are defined:", req.signedCookies.tokens);
    return true;

};

/**
 * Initializes the OAuth2 information
 * @returns {OAuth2}
 */
YoutubeCommands.prototype.initiliazeOauth = function (req, res) {

    var cfg, oauth2Client;
    cfg = new Config();

    oauth2Client =
        new OAuth2(cfg.CLIENT_ID, cfg.CLIENT_SECRET, cfg.REDIRECT_URL);

    console.log("initializeOauth() >> signed cookie tokes are:", req.signedCookies.tokens);

    // If the credentials are set
    if ((req.signedCookies.tokens !== undefined) || (req.signedCookies.tokens !== null)) {
        // Set the cookie
        oauth2Client.setCredentials(req.signedCookies.tokens);
    }

    return oauth2Client;
};

/**
 * Gets all the items in a playlist
 * @param client The connection client
 * @param authClient The authorization information
 * @param {String} playlistId The ID of the playlist
 * @param {Function} callback the callback function
 */
YoutubeCommands.prototype.getPlaylistItems = function (client, authClient, playlistId, callback) {

    client
        .youtube.playlistItems.list({ part : "id, snippet, status, contentDetails",
            playlistId : playlistId})
        .withAuthClient(authClient)
        .execute(callback);

};

/**
 * Inserts the given video to playlist
 * @param client The communication ID
 * @param authClient the authorization information
 * @param {String} playlistId The ID of the playlist where to add the video
 * @param {String} videoId The ID of the video to add
 * @param {Function} callback Callback function
 */
YoutubeCommands.prototype.insertToPlaylist = function (client, authClient, playlistId, videoId, callback) {

    // Create the snippet to insert
    var snippet = { playlistId: playlistId,
        resourceId: {
            videoId: videoId,
            kind: "youtube#video"
        }};

    client
        .youtube.playlistItems.insert({ part : "snippet, status"}, { snippet : snippet })
        .withAuthClient(authClient)
        .execute(callback);
};

/**
 * Gets All the playlists
 * @param client The connection client
 * @param authClient The authorization information
 * @param {Function} callback The function callback
 */
YoutubeCommands.prototype.getPlaylists = function (client, authClient, callback) {

    client
        .youtube.playlists.list({ part : "id,snippet,status,contentDetails",
            mine : true })
        .withAuthClient(authClient)
        .execute(callback);
};

/**
 * Exports the youtube commands module here
 * @type {YoutubeCommands}
 */
module.exports = YoutubeCommands;