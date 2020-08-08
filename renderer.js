const {ipcRenderer} = require('electron')

document.getElementById('start').addEventListener("click", _ => {
    //console.log('start clicked!')
    ipcRenderer.send('countdown-start') 
})

ipcRenderer.on('countdown', (evt, count) => {
    console.log("count: " + count)
    document.getElementById('count').innerHTML = count
})