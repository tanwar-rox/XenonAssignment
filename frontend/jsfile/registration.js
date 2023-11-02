const apiUrl = 'http://localhost:3000'
// Event listener for the registration form
const registrationForm = document.querySelector("#registrationForm");
const alert = document.querySelector('.alert');
alert.style.display = 'none'
registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
    }

    if (name && email && password) {
        const user = {
            name,
            email,
            password
        };


        fetch(`${apiUrl}/createuser`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((r) => r.json()).then((response) => {
            alert.style.display = 'block'
            var newContent = document.createElement("p");
            newContent.textContent = response;
            alert.appendChild(newContent);
            setTimeout(() => {
                alert.style.display = 'none'

            }, 1000);
        });

    }




    // You can also send the data to a server for storage in a real application.

    // Clear the form
    registrationForm.reset();
});





