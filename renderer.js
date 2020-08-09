const {ipcRenderer} = require('electron')

document.getElementById('start').addEventListener("click", _ => {
    //console.log('start clicked!')
    //ipcRenderer.send('countdown-start') 
    let urlYoutube = document.getElementById('urlYoutube').value
    console.log("urlYoutube: "+urlYoutube)
    ipcRenderer.send('youtube-download-mp3',urlYoutube) 
})

// ################################################

ipcRenderer.on('download', (evt, urlYoutube) => {
    console.log("urlYoutube: " + urlYoutube)
    document.getElementById('urlYoutubeIndicted').innerHTML = urlYoutube
    window.alert(urlYoutube);
})

ipcRenderer.on('countdown', (evt, count) => {
    console.log("count: " + count)
    document.getElementById('urlYoutube').innerHTML = count
})

