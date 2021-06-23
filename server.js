//création du serveur
const io = require('socket.io')(3000, {
    cors:{
        origin:"*"
    },
});

const users = {}

// A chaque fois qu'un user charge le site la fonction est appelée,
// on donne a chque users un socket
io.on('connection', socket => {
    socket.on('new-user', name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    //serveur reçoit un l'event send-chat-message
    socket.on('send-chat-message', message =>{
        // le message sera envoyé à ttes les perssonnes connectées au server
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id] )
        delete users[socket.id]
    })
})