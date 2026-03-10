# Coral Timer 🪸

![GPL License](https://img.shields.io/badge/license-GPL-blue.svg)
![Status](https://img.shields.io/badge/status-active-success)

**Coral Timer** is a simple **synchronized timer** designed for shared environments (events, classrooms, competitions, etc.).  
It keeps all connected clients perfectly in sync using **Unix time and WebSockets** with minimal client-server interaction.


## Install

```bash
npm install
````

## Start

```bash
npm start
```


## How It Works

Coral Timer uses a **Unix time–based synchronization model**.

Instead of continuously syncing timer state between clients, the server only sends the **start timestamp and timer state**. Each client calculates the current timer value locally using the system clock.

### Why This Works Well

* **Highly accurate** across many clients
* **Minimal server load**
* **Low network traffic**
* **No drift between clients**
* **Instant reconnection recovery**

WebSockets are used to broadcast **state changes** (start, stop, reset), allowing all clients to update instantly.


## Tech Stack

* **Node.js**
* **WebSockets** for realtime synchronization
* **DaisyUI** for the interface


## Environment Variables

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `PORT`           | Server port                     |
| `ADMIN_PASSWORD` | Password for the `/admin` panel |

Example:

```bash
PORT=3000
ADMIN_PASSWORD=yourpassword
```


## Screens / Routes

### `/`

The **public synchronized timer** view.

Displays the timer synced across all connected clients.

### `/mod`

Moderator panel.

Allows basic controls:

* Start timer
* Stop timer

### `/admin`

Administrator panel.

Includes all moderator controls plus:

* Set/change the password for the `/mod` panel

