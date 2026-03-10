
document.addEventListener("DOMContentLoaded", init)
function init() {

    document.getElementById("sendModPass").onclick = () => {
        const password = document.getElementById("modPass").value;

        if (!password) return;

        fetch("/config/mod/password", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authentication": getPassword()
            },
            body: JSON.stringify({ password: password })
        })
    };


}

function getPassword() {
    return document.getElementById("password").value;
}