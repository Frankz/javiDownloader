var YoutubeMp3Downloader = require("youtube-mp3-downloader");
// Get Home Dir
const homedir = require('os').homedir();
// Get URL Parameter
//const querystring = require('querystring');
var url = require('url');
// Chesney Hawkes - The One and Only
// https://www.youtube.com/watch?v=94vGsYTsPRQ
const request_url = "https://www.youtube.com/watch?v=a4eav7dFvc8";
var url_parts = url.parse(request_url, true);
var video_id = url_parts.query.v;
//console.log("video_id: "+video_id);
//console.log(url)

//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "./node_modules/ffmpeg/bin/ffmpeg.exe",        // FFmpeg binary location
    // C:\Users\franc\OneDrive\Escritorio
    "outputPath": homedir+"/OneDrive/Escritorio/",    // Output file location (default: the home directory)
    "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
    "queueParallelism": 2,                  // Download parallelism (default: 1)
    "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
    "allowWebm": false                      // Enable download from WebM sources (default: false)
});
 
//Download video and save as MP3 file
YD.download(video_id);
 
YD.on("finished", function(err, data) {
    console.log(JSON.stringify(data));
});
 
YD.on("error", function(error) {
    console.log(error);
});
 
YD.on("progress", function(progress) {
    console.log(JSON.stringify(progress));
});