//express module assigned too app variable
var app = require('express')();

// setting up server via express??
var http = require('http').Server(app);

//setting up socket.io module on variable: io
var io = require('socket.io')(http);


//send html file on connection by user
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

var users = 0;

/*when someone connects to server they are treated as a 'socket'
also io.on should include server & socket code*/
io.on('connection', function(socket){
    users++;
    io.sockets.emit('broadcast', {description: users + ' users connected'});

    //socket.xx used to point to users i.e. sockets

    socket.on('disconnect', function(){
        users--;
        io.sockets.emit('broadcast', {description: users + ' users connected'});
        console.log('user disconnected');
    });
});



//port connection
http.listen(8080, function(){
    console.log('server open on 8080');
});