const form = document.querySelector(".typing-area"),
inputField = document.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault(); //preventing form from submitting
}

sendBtn.onclick = ()=>{
    //Lets start Ajex
    let xhr = new XMLHttpRequest(); //Creating XML Object
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                inputField.value = ""; //once message inserted into database then leave blank the input field
                scrollToBottom();
            }
        }
    }
    //we have to send  the form data throgh ajax to php
    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //sending the form data to php
}

chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active")
}
chatBox.onmouseleaver = ()=>{
    chatBox.classList.remove("active")
}
setInterval(()=>{
    //Lets start Ajex
    let xhr = new XMLHttpRequest(); //Creating XML Object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                chatBox.innerHTML = data;
                if(!chatBox.classList.contains("active")){//if active class not contains in chatbox the scroll to bottom
                    scrollToBottom();
                }
              
            }
        }
    }
    //we have to send  the form data throgh ajax to php
    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //sending the form data to php
    
}, 500); //this function will run frequently after 500ms

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}