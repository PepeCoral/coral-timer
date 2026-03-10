
document.addEventListener("DOMContentLoaded", init)
function init() {

  const startButton = document.getElementById("start")

  startButton.addEventListener("click", (_) => {
    console.log(state)

    fetch("/start", {
      method: 'POST',
      headers: { "Authentication": getPassword() }
    }).then(response => {
      if (response.ok) {
      } else {
        showToast(response.status + " - Failed to start timer", style = "error");

      }
    })
      .catch(err => console.log(err));
  })

  const stopButton = document.getElementById("stop")

  stopButton.addEventListener("click", (_) => {
    console.log(state)

    fetch("/stop", {
      method: 'POST',
      headers: { "Authentication": getPassword() }
    }).then(response => {
      if (response.ok) {
      } else {
        showToast(response.status + " - Failed to stop timer", style = "error");

      }
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
        "Content-Type": "application/json",
        "Authentication": getPassword()
      },
      body: JSON.stringify({ time: totalMillis })
    }).then(response => {
      if (response.ok) {
        showToast("Timer set");
      } else {
        showToast(response.status + " - Failed to set timer", style = "error");

      }
    })
      .catch(err => console.log(err));
  };


}


function getPassword() {
  return document.getElementById("password").value;
}
