//emplacement du socket
const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send_container')
const messageInput = document.getElementById('message_input')
const messageContainer = document.getElementById('message_container')

// création user
const name = prompt('What is your name ?')
appendMessage('You joined')
socket.emit('new-user', name)

// dès qu'on recoit un evenement on veut appeler une fonction (data)
socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name =>{
    appendMessage(`${name} connected`);
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`);
    //emit va envoyer des info du client vers le serveur
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}