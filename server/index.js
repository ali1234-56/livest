var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var Server = require('socket.io').Server;
var io = new Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', function (socket) {
    socket.on('client-ready', function () {
        socket.broadcast.emit('get-canvas-state');
    });
    socket.on('canvas-state', function (state) {
        console.log('received canvas state');
        socket.broadcast.emit('canvas-state-from-server', state);
    });
    socket.on('draw-line', function (_a) {
        var prevPoint = _a.prevPoint, currentPoint = _a.currentPoint, color = _a.color;
        socket.broadcast.emit('draw-line', { prevPoint: prevPoint, currentPoint: currentPoint, color: color });
    });
    socket.on('clear', function () { return io.emit('clear'); });
});
server.listen(3001, function () {
    console.log('✔️ Server listening on port 3001');
});
