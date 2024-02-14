const form = document.querySelector(".login form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-txt");

form.onsubmit = (e)=>{
    e.preventDefault(); //preventing form from submitting
}

continueBtn.onclick = ()=>{
    //Lets start Ajex
    let xhr = new XMLHttpRequest(); //Creating XML Object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                console.log(data);
                
                // if(data == "success"){
                //     location.href = "users.php";
                // }else{
                //     errorText.textContent = data;
                //     errorText.style.display = "block";
                   
                // }
                if (data.trim().toLowerCase() === "success") {
                    window.location.href = "users.php";
                } else {
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
                
            }
        }
    }
    //we have to send  the form data throgh ajax to php
    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //sending the form data to php
}