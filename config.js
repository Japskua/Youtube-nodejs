/**
 * Created by Janne on 3.7.2014.
 */

/**
 * The configuration function constructor
 * @constructor
 */
function Config() {

    this.CLIENT_ID = 'CLIENT_ID';
    this.CLIENT_SECRET = 'CLIENT_SECRET';
    this.REDIRECT_URL = 'https://www.example.com/oauth2callback';

    this.TOKENS = {
        access_token : "ACCESS_TOKEN",
        refresh_token : undefined
    };

    // Set the Ffmpeg path here
    this.ffmpegPath = "C:\\ffmpeg\\bin\\ffmpeg.exe";
    this.ffprobePath = "C:\\ffmpeg\\bin\\ffprobe.exe";
}

// Export the config
module.exports = Config;