state = null

let minutesSpan;
let secondsSpan;
let progress;
let bg;

const socket = io();

fetch('/time')
    .then(response => response.json())
    .then(response => {

        error = Math.abs(response - Date.now())

        if (error > 2 * 1000) alert("Comprueba la configuración de tu reloj, es posible que estes desincronizado")

    })
    .catch(err => console.log(err))

fetch('/status')
    .then(response => response.json())
    .then(response => {
        state = response
        onTick(now(), force = true)
    })
    .catch(err => console.log(err))


document.addEventListener("DOMContentLoaded", init)
function init() {

    minutesSpan = document.getElementById("minutes")
    secondsSpan = document.getElementById("seconds")
    progress = document.getElementById("progress")
    bg = document.getElementById("bg")

    socket.on('timerUpdate', (newState) => {
        state = newState;
        onTick(now(), force = true)
    });

    setInterval(onTick, 100);
}


function onTick(force = false) {
    if (state.timerPauseTime && !force) return;
    updateTimer(now());
    updateProgressBar(now());
    updateBg(now())
}


function updateBg(now) {

    let diff = state.timerEndTime - now;
    if (diff < 0) diff = 0;

    bg.classList.remove("base-100", "bg-warning", "bg-error")

    if (diff <= 10 * 1000) {
        bg.classList.add("bg-error")
    } else if (diff <= 60 * 1000) {
        bg.classList.add("bg-warning")
    } else {
        bg.classList.add("base-100")
    }
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
    progress.value = calculteProgessPercent(now)
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