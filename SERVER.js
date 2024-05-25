const express = require('express');
const http = require('http');  // Import the http module
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);  // Create an HTTP server with the Express app
//define io 
const io = socketio(server, {
    cors: {//do this to avoid cors error

        origin: ["http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true


    },
});  // Initialize Socket.IO with the HTTP server

const port = 3000;


io.on("connection", socket => {
    socket.on('Pmove', (btext,index,Cturn,input,inputid) => {//read and respouse to the emitted event from client
        //first check if room is empty
        if(input === '' ){
        socket.broadcast.emit('sendmsgtoallclient',btext,index,Cturn)
        }else{
            socket.to(input).emit('sendmsgtoallclient',btext,index,Cturn)
            
        
        }
    })
    socket.on('winner', (Twin)=>{
        socket.broadcast.emit('sendwin',Twin)


    })
        
})
    
    
    

    
// Setup a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
    // Send a response for GET on '/'
});
app.get('/index.html', (req, res) => {
    res.send('Hello World!');
    alert("welcome")

})

// Listen on the HTTP server, not the Express app
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
