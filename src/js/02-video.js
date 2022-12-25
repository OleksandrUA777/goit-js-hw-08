import Player from "@vimeo/player"
import throttle from "lodash.throttle";

const SECONDS_KEY = "videoplayer-current-time"

    const iframe = document.querySelector('iframe');
    const player = new Player(iframe);  

player.on('timeupdate', throttle(timeChangeHandler,1000)) 
function timeChangeHandler(currentTime){
    const seconds = currentTime.seconds
    localStorage.setItem(SECONDS_KEY,seconds)
}
const savedData = localStorage.getItem(SECONDS_KEY)

if(savedData){
player.setCurrentTime(savedData).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
})
}