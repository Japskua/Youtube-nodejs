/**
 * Created by Janne on 3.7.2014.
 */

/**
 * The configuration function constructor
 * @constructor
 */
function Config() {

    this.CLIENT_ID = 'YOUR_CLIENT_ID';
    this.CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
    // This is just an example, you should change this to something better
    this.REDIRECT_URL = 'https://www.example.com/oauth2callback';

    // These are the tokens used in this test
    this.TOKENS = {
        access_token : undefined,
        refresh_token : undefined
    };
}

// Export the config
module.exports = Config;