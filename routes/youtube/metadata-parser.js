/**
 * Created by Janne on 9.7.2014.
 */

"use strict";

var ffmpeg = require('fluent-ffmpeg');
var Config = require('./../../config.js');

/**
 * Constructor for the Metadata Parser of Videos
 * @constructor
 */
function MetadataParser() {
    ffmpeg.setFfmpegPath(config.ffmpegPath);
    ffmpeg.setFfprobePath(config.ffprobePath);
}

/**
 * Parses the given video for the creation time and returns it as string
 * @param source {String} The video source to read
 * @param callback {Function} The callback function
 * @return {String} Returns a string containing the creation time of the video
 * @constructor
 */
MetadataParser.prototype.ParseVideoCreationTime = function (source, callback) {

    console.log("Starting to analyze the metadata");

    source = "/nauhoite.mp4";

    var cfg = new Config();

    ffmpeg.setFfmpegPath(cfg.ffmpegPath);
    ffmpeg.setFfprobePath(cfg.ffprobePath);

    console.log(cfg.ffprobePath);

    // Probe for the metadata information of the video
    ffmpeg.ffprobe(source, function (err, metadata) {

        // If there is an error, return the message
        if (err) {
            console.log(err);
            callback(err);
            return;
        }

        console.log("Metadata analyzed, result is:", metadata);
        // Return the creation time
        callback(null, metadata.streams[0].tags.creation_time);
    });

};

module.exports = MetadataParser;