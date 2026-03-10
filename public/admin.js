
document.addEventListener("DOMContentLoaded", init)
function init() {

    document.getElementById("sendModPass").onclick = () => {
        const password = document.getElementById("modPass").value;

        if (!password) return;

        fetch("/config/mod/password", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password })
        })
    };


}

