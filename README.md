# ⚡ WebSocket Server

> 🚧 **Work in Progress** — actively being developed.

A real-time WebSocket broadcast server built with **Node.js** and the [`ws`](https://github.com/websockets/ws) library. Every message sent by any client is instantly broadcast to **all** connected clients.

---

## ✨ Features

- 🔁 Real-time message broadcasting to all connected clients
- 🌐 Tracks sender IP address per connection
- 🛡️ Handles errors and disconnections gracefully
- 🔄 Auto-restarts on file changes via `node --watch`

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm run dev
```

Server will be live at `ws://localhost:8080`

---

## 🧪 Testing with wscat

Install wscat globally:

```bash
npm install -g wscat
```

Open **two or more terminals** and connect each to the server:

```bash
wscat -c ws://localhost:8080
```

Type a message in any terminal — it will instantly appear in **all** connected terminals.

---

## 📁 Project Structure

```
websocket/
├── server.js       # WebSocket server logic
└── package.json    # Project config & dependencies
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| [`ws`](https://github.com/websockets/ws) | WebSocket server implementation |
| [`wscat`](https://github.com/websockets/wscat) | CLI client for testing WebSocket connections |

---

## 🛣️ Roadmap

- [ ] More features coming soon...

---

> Built with ❤️ using Node.js
