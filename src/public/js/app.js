const messageList = document.querySelector("ul");
const nickform = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handlesOpen(){
    console.log("Connected to Server");
}
socket.addEventListener("open", handlesOpen);

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () =>{
    console.log("Disconnected from Server");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickform.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    // input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickform.addEventListener("submit", handleNickSubmit);