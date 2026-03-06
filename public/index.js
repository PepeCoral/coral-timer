state = null

let minutesSpan;
let secondsSpan;



fetch('/status')
    .then(response => response.json())
    .then(response => {
        state = response
        updateTimer()
    })
    .catch(err => console.log(err))


window.onload = init
function init() {

    minutesSpan = document.getElementById("minutes")
    secondsSpan = document.getElementById("seconds")

    setInterval(onTick, 1000);

}


function onTick() {
    if (!state.isRunning) return;
    updateTimer();
}

function updateTimer() {

    if (!state || !state.timerEndTime) return;



    const now = Date.now()

    const minutes = calculateMinutesLeft(state.timerEndTime, now)
    const seconds = calculateSecondsLeft(state.timerEndTime, now)

    minutesSpan.style.setProperty('--value', minutes)
    minutesSpan.innerHTML = minutes

    secondsSpan.style.setProperty('--value', seconds)
    secondsSpan.innerHTML = seconds
}

function calculateMinutesLeft(target, now) {

    const diff = target - now;
    return Math.floor(diff / (60 * 1000))


}

function calculateSecondsLeft(target, now) {

    let diff = target - now;
    const minutes = calculateMinutesLeft(target, now);
    diff -= minutes * 60 * 1000
    return Math.floor(diff / 1000);

}