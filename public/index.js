state = null

let minutesSpan;
let secondsSpan;
let progress;



fetch('/status')
    .then(response => response.json())
    .then(response => {
        state = response
        updateTimer(now())
    })
    .catch(err => console.log(err))


window.onload = init
function init() {

    minutesSpan = document.getElementById("minutes")
    secondsSpan = document.getElementById("seconds")
    progress = document.getElementById("progress")

    setInterval(onTick, 100);


}


function onTick() {
    if (state.timerPauseTime) return;
    updateTimer(now());
    updateProgressBar(now());
}

function updateTimer(now) {

    if (!state || !state.timerEndTime) return;




    const minutes = calculateMinutesLeft(state.timerEndTime, now)
    const seconds = calculateSecondsLeft(state.timerEndTime, now)

    minutesSpan.style.setProperty('--value', minutes)
    minutesSpan.innerHTML = minutes

    secondsSpan.style.setProperty('--value', seconds)
    secondsSpan.innerHTML = seconds
}

function updateProgressBar(now) {

    if (!state) return;
    progress.value = calculteProgessPercent()
}

function calculateMinutesLeft(target, now) {

    let diff = target - now;
    if (diff < 0) diff = 0
    return Math.floor(diff / (60 * 1000))


}

function calculateSecondsLeft(target, now) {

    let diff = target - now;
    if (diff < 0) diff = 0
    const minutes = calculateMinutesLeft(target, now);
    diff -= minutes * 60 * 1000
    return Math.floor(diff / 1000);

}

function calculteProgessPercent(now) {

    const totalTime = state.timerEndTime - state.timerStartTime
    const currentTime = now - state.timerStartTime
    const percent = currentTime / totalTime;
    return 100 - percent * 100;

}

function now() {
    if (state.timerPauseTime) return state.timerPauseTime
    return Date.now()
}