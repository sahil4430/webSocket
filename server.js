import { WebSocket, WebSocketServer } from "ws";
import {v4 as uuid} from 'uuid';

const wss = new WebSocketServer ({port :8080}) ;
const waitingque =[];
const ActivePair = new Map();
const clients = new Map();


//connection 
//hello
if (waitingque.includes(socket.userId)) return; 

wss.on("connection",(socket, request)=>{
    const ip = request.socket.remoteAddress;
    socket.userId=uuid();
    clients.set(socket.userId,socket);
    
    if ( waitingque.length >0){
        const roomId = uuid();
        const pairedUserId = waitingque.shift();

        const pairedSocket = clients.get(pairedUserId);
        
        
        ActivePair.set(pairedUserId,socket.userId);
        ActivePair.set(socket.userId,pairedUserId);

        socket.send(`You are paired with user ${pairedUserId} in room ${roomId}`);
        socket.send(JSON.stringify({roomId, pairedUserId}));

        pairedSocket.send(`You are paired with user ${socket.userId} in room ${roomId}`);

        pairedSocket.send(JSON.stringify({roomId, pairedUserId: socket.userId}));
    }else{
        waitingque.push(socket.userId);
    }

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
