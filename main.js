const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);

const port = process.env.PORT || 8000;


let configuration = {
    time: 16 * 60 * 1000
}

let state = {
    timerEndTime: null,
    timerStartTime: null,
    timerPauseTime: null
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + "/public/admin.html")
})

app.use(express.static(__dirname, + '/public'))

app.get('/status', (req, res) => {
    res.json(state)
})

app.get('/time', (req, res) => {
    res.json(Date.now())
})

app.post("/start", (req, res) => {
    console.log("Timer has started!")
    state = {
        timerStartTime: Date.now(),
        timerPauseTime: null,
        timerEndTime: Date.now() + configuration.time
    }
    res.json(state)
})

app.post("/stop", (req, res) => {
    state = {
        ...state,
        timerPauseTime: Date.now()
    }
    console.log("Timer has stopped!")
    res.json(state)
})

http.listen(port, () => {
    console.log("Server is ready in port: " + port);
});