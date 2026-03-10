const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

const port = process.env.PORT || 8000;
const adminPassword = process.env.ADMIN_PASSWORD || "admin";


let configuration = {
    time: 16 * 60 * 1000,
    moderatorPassword: null
}

let state = {
    timerEndTime: null,
    timerStartTime: null,
    timerPauseTime: null
}


app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + "/public/admin.html")
})

app.get('/mod', (req, res) => {
    res.sendFile(__dirname + "/public/mod.html")
})

app.post('/config/time', (req, res) => {


    if (!authAdminOrModerator(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const time = Number(req.body.time);

    configuration = { ...configuration, time: time }

    state = {
        timerStartTime: Date.now(),
        timerPauseTime: Date.now(),
        timerEndTime: Date.now() + configuration.time
    }

    io.emit('timerUpdate', state);
    res.json(state)
})

app.post('/config/mod/password', (req, res) => {


    if (!authAdmin(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    configuration = { ...configuration, moderatorPassword: req.body.password }

    res.json(state)
})

app.use(express.static(__dirname, + '/public'))

app.get('/status', (req, res) => {
    res.json(state)
})

app.get('/time', (req, res) => {
    res.json(Date.now())
})

app.post("/start", (req, res) => {

    if (!authAdminOrModerator(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    state = {
        timerStartTime: Date.now(),
        timerPauseTime: null,
        timerEndTime: Date.now() + configuration.time
    }

    console.log("Timer has started!")
    io.emit('timerUpdate', state);
    res.json(state)
})

app.post("/stop", (req, res) => {


    if (!authAdminOrModerator(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (state.timerPauseTime != null) { res.json(state); return; }
    state = {
        ...state,
        timerPauseTime: Date.now()
    }
    console.log("Timer has stopped!")

    io.emit('timerUpdate', state);
    res.json(state)
})



function authAdmin(req) {
    const password = req.headers['authentication'];
    return isAdmin(password)
}

function authAdminOrModerator(req) {
    const password = req.headers['authentication'];
    return isAdminOrMod(password);
}

function isAdmin(password) {
    return password === adminPassword
}

function isAdminOrMod(password) {
    return isAdmin(password) || isMod(password)
}

function isMod(password) {
    return configuration.moderatorPassword && configuration.moderatorPassword === password
}


io.on('connection', (socket) => {
    console.log('A client connected');

    // Send current state immediately on connection
    socket.emit('timerUpdate', state);

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

http.listen(port, () => {
    console.log("Server is ready in port: " + port);
});