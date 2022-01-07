// this is sending the connection
class ChatEngine{
    constructor(chatBoxId , userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:3000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    //creating a connection handler
    // this contains the connection details between subscriber and observer
    connectionHandler(){
        this.socket.on('connection' , function(){
            console.log('connection establish using socket .......!');
            self.socket.emit('join_room' , {
                user_email:self.userEmail,
                chatroom :'codeial'
            });
            
            self.socket.on('user_join' , function(data){
                console.log('a user joined' , data);
            })

        });

    }
}