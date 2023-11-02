const apiUrl = 'http://localhost:3000';
const button = document.querySelector(".deletebutton");

const alert = document.querySelector('.alert')
alert.style.display='none'

const functionalert = (response)=>{
    alert.style.display = 'block'
    var newContent = document.createElement("p");
    newContent.textContent = response.message;
    alert.appendChild(newContent);
    setTimeout(() => {
        alert.style.display = 'none'

    }, 1000);
}


button.addEventListener("click",function(e){
    e.preventDefault();
    const email = document.querySelector("#email1").value
    console.log(email)
// Assuming you have the email in a variable


fetch(`${apiUrl}/deleteusers?email=${email}`, {
    method: "DELETE",
    headers: {
        "Content-type": "application/json"
    }
}).then((r)=>r.json())
.then(response => {

    functionalert(response);
   
})
.catch(error => {
   
    console.error('Fetch error:', error);
});



})

const update = document.querySelector(".updatebutton")
const profileform=document.querySelector("#profileForm")
update.addEventListener("click",function(e){
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const name = document.querySelector("#name").value;
    const password =document.querySelector("#password").value;
    const user={
        email,
        name,
        password
    }

fetch(`${apiUrl}/updateusers`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
}).then((r)=>r.json())
.then(response => {
  functionalert(response)
})
.catch(error => {
    console.error('Fetch error:', error);
});
profileform.reset();

})

const read = document.querySelector(".readbutton");
read.addEventListener("click",function(){
    const dataList = document.getElementById("dataList");

    fetch(`${apiUrl}/readuser`) 
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Process and display the fetched data
            data.forEach((item) => {
                const listItem = document.createElement("li");

                // Create elements for name, email, and password
                const nameElement = document.createElement("p");
                const emailElement = document.createElement("p");
                const passwordElement = document.createElement("p");

                // Set the text content of each element
                nameElement.textContent = `Name: ${item.name}`;
                emailElement.textContent = `Email: ${item.email}`;
                passwordElement.textContent = `Password: ${item.password}`;

                // Append the elements to the list item
                listItem.appendChild(nameElement);
                listItem.appendChild(emailElement);
                listItem.appendChild(passwordElement);

                // Append the list item to the data list
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
})


