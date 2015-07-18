var express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);

express.get('/public/css/draughts.css', function(req,res){
    res.sendFile(__dirname + '/public/css/draughts.css');
});

express.get('/public/images/white.png', function(req,res){
    res.sendFile(__dirname + '/public/images/white.png');
});

express.get('/public/images/black.png', function(req,res){
    res.sendFile(__dirname + '/public/images/black.png');
});

express.get('/public/images/white-king.png', function(req,res){
    res.sendFile(__dirname + '/public/images/white-king.png');
});

express.get('/public/images/black-king.png', function(req,res){
    res.sendFile(__dirname + '/public/images/black-king.png');
});


express.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

    socket.on('move', function(original_position, new_position, to_letter, to_number) {

        io.emit('move',original_position, new_position, to_letter, to_number);
    })


    socket.on('taken_player', function(original_position, new_position, to_letter, to_number, taken_players_square) {

        io.emit('taken_player',original_position, new_position, to_letter, to_number, taken_players_square);
    })
})


http.listen(3000, function(){
    console.log('listening on *:3000');
});