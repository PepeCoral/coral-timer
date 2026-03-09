
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


}

