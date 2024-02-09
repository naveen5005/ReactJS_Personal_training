function uniqueIdentifier() {
    return Math.random().toString(36).substring(2, 12);
}
function returnObj() {
    return {
        id: null,
        username: "",
        email: "",
        age: "",
        city: ""
    }
}
function readDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value == "" ? uniqueIdentifier() : document.getElementById(a).value;
        }
        else {
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}

function getDataFromAPI() {
    fetch("http://localhost:3000/demo1", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: null
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((users) => {
        console.log(users);
        displayUser(users);
    }).catch(error => {
        console.error('Error', error);
    })
}
getDataFromAPI();




dynamicButtons = (text, event, data, target) => {
    var myEditTd = document.createElement("td");
    var myEditBtn = document.createElement("button");
    myEditBtn.innerHTML = text;
    myEditBtn.addEventListener("click", function () {
        event(data);
    })
    myEditTd.appendChild(myEditBtn);
    target.appendChild(myEditTd);
}
function displayUser(users) {
    users.forEach((data) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            myTd.innerHTML = data[a];
            myTr.appendChild(myTd);
        }
        dynamicButtons("EDIT", editUser, data, myTr);
        dynamicButtons("DELETE", deleteUser, data, myTr);
        document.querySelector("tbody").appendChild(myTr);
    })
}
var addToggle = document.querySelector("#adduser");
var updateToggle = document.querySelector('#updateuser');
editUser = (data) => {
    updateData = data;
    for (a in data) {
        document.getElementById(a).value = data[a];
    }

    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
deleteUser = (data) => {
    fetch("http://localhost:3000/demo1/" + data.id, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: null
    })
}
updateUser = () => {
    var data = readDataFromFOM();
    fetch("http://localhost:3000/demo1/" + data.id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}
addUser = () =>{
    var data = readDataFromFOM();
    fetch("http://localhost:3000/demo1",{
        method:"POST",
        headers:{'Content-Type':'application.json'},
        body:JSON.stringify(data)
    })
}