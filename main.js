const { app, BrowserWindow, ipcMain } = require('electron');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const countdown = require('./countdown.js');
const download = require('./download.js');
var path = require('path');
global.appRoot = path.resolve(__dirname);


// ---------------- Context Menu
const contextMenu = require('electron-context-menu');

contextMenu({
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Rainbow',
			// Only show it when right-clicking images
			visible: params.mediaType === 'image'
		},
		{
			label: 'Search Google for “{selection}”',
			// Only show it when right-clicking text
			visible: params.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
			}
		}
	]
});



// ----------------

//var YoutubeMp3Downloader = require("youtube-mp3-downloader");
// Get Home Dir
//const homedir = require('os').homedir();
// Get URL Parameter
//const querystring = require('querystring');
//var url = require('url');

let win

function createWindow () {
  //countdown()
  console.log("Creating Window")
  
  // Create the browser window.
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
  
  // Open the DevTools.
  //win.webContents.openDevTools()
  ipcMain.on('youtube-download-mp3', (event, urlDeYoutube) => {
    console.log("llego el mensaje: "+ urlDeYoutube)
    win.webContents.send('download', "Revisando la URL")
     //download(urlDeYoutube => {
     // win.webContents.send('download', urlDeYoutube)
     //})
     // ················ ······················ ·················
     // ················ ······················ ·················
     // ················ ······················ ·················
     //var YoutubeMp3Downloader = require("youtube-mp3-downloader");
     // Get Home Dir
     const homedir = require('os').homedir();
     // Get URL Parameter
     //const querystring = require('querystring');
     var url = require('url');
     // Chesney Hawkes - The One and Only
     const request_url = urlDeYoutube
     var url_parts = url.parse(request_url, true);
     var video_id = url_parts.query.v;
     //console.log("video_id: "+video_id);
     //console.log(url)
     
     //Configure YoutubeMp3Downloader with your settings
     var YD = new YoutubeMp3Downloader({
         "ffmpegPath": global.appRoot+"/ffmpeg/bin/ffmpeg.exe",        // FFmpeg binary location
         // C:\Users\franc\OneDrive\Escritorio
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
         win.webContents.send('download', "Listo! la canción ya se descargó")
     });
      
     YD.on("error", function(error) {
         console.log(error);
         win.webContents.send('download', JSON.stringify(error))
     });
      
     YD.on("progress", function(progress) {
         console.log(JSON.stringify(progress));
         win.webContents.send('download', "Esperando a que se descargue la canción")
         setTimeout(function(){
          win.webContents.send('download', "")
          }, 2000);
     });
     // ················ ······················ ·················
     // ················ ······················ ·················
     // ················ ······················ ·················
    
  })

  ipcMain.on('countdown-start', _ => {
    countdown(count => {
      win.webContents.send('countdown', count)
    })
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here
