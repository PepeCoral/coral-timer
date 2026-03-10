
document.addEventListener("DOMContentLoaded", init)
function init() {

    const startButton = document.getElementById("start")

    startButton.addEventListener("click", (_) => {
        console.log(state)

        fetch("/start", { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                state = response
            })
            .catch(err => console.log(err))
    })

    const stopButton = document.getElementById("stop")

    stopButton.addEventListener("click", (_) => {
        console.log(state)

        fetch("/stop", { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                state = response
            })
            .catch(err => console.log(err))
    })

    document.getElementById("sendTime").onclick = () => {
        const minutes = parseInt(document.getElementById("inputMinutes").value) || 0;
        const seconds = parseInt(document.getElementById("inputSeconds").value) || 0;

        const totalMillis = (minutes * 60 + seconds) * 1000;

        fetch("/config/time", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ time: totalMillis })
        })
    };


}

