/**
 * Created by Janne on 3.7.2014.
 */

"use strict";

/**
 * The configuration function constructor
 * @constructor
 */
function Config() {

    this.CLIENT_ID = '630220068318-hmvth59daua2p3je12hn7j2i2h8tgo9k.apps.googleusercontent.com';
    this.CLIENT_SECRET = 'BSvpx4ZBOJQ5gIBk0eyl_aBw';
    this.REDIRECT_URL = 'https://www.example.com/oauth2callback';

    // Set the Ffmpeg path here
    this.ffmpegPath = "C:\\ffmpeg\\bin\\ffmpeg.exe";
    this.ffprobePath = "C:\\ffmpeg\\bin\\ffprobe.exe";
}

// Export the config
module.exports = Config;