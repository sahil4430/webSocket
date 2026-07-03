import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer ({port :8080}) ;

//connection 
//hello
wss.on("connection",(socket, request)=>{
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData)=>{
        const msg = rawData.toString();
        console.log(`message ${ip}: ${rawData}`)
        console.log({rawData})
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN){
                client.send(`server Boarcast: ${msg}`)
            }
        })
    })
    socket.on('error', (err)=>{
        console.log(`error ${ip}: ${err}`)
    })
    socket.on ('close', ()=>{
        console.log(`connection closed `)
    })
})
console.log("websocket server started at port 8080")

//to making connection from client side or check the server is running or not we can use below command in terminal

//const socket = new WebSocket('ws://localhost:8080');
// socket.onmessage = (event) =>{
//     console.log(`on message function `, event.data);
// }
// socket.onopen =() =>{
//     socket.send('Hello from the client!');
// }
