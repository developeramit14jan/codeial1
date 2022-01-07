// receving the  connection
module.exports.chatSockets = function(socketServder){
    let io = require('socket.io')(socketServder);

    io.sockets.on('connection' , function(socket){
        console.log('new connection received' , socket.id);
        socket.on('disconnect' , function(){
            console.log('socket disconnected !');
        });


        // ask for joining a room
        socket.on('join_room', function(data){
            console.log('Joining room event' , data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined' , data);
        })


    });

}