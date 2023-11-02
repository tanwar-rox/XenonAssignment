

const apiUrl = 'http://localhost:3000'



// Event listener for the registration form
const loginform = document.querySelector("#loginForm");
const alert = document.querySelector('.alert');
alert.style.display = 'none'
loginform.addEventListener("submit", function (e) {
    e.preventDefault();


    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;


    const user = {
        email,
        password
    };


    fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((r) => r.json()).then((response) => {

        alert.style.display = 'block'
        var newContent = document.createElement("p");
        newContent.textContent = response.message;
        alert.appendChild(newContent);
        setTimeout(() => {
            alert.style.display = 'none'
           if(response ==="Authentication successful"){
            window.location.href="https://fully-fledged-react-app.vercel.app/"
           }
        }, 1000);

    });



    loginform.reset();
});





