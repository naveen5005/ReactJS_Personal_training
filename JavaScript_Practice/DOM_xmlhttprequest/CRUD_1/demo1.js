function uniqueIdentifier() {
    const randomId = Math.random().toString(36).substring(2, 10);
    return randomId;
}
function readObject(){
    const user = {
        id: "",
        username: "",
        email: "",
        age: "",
        city: ""
    }
    return user;
}
function readDataFromFOM() {
    const user =readObject()
    for (a in user) {
        if (a !== "id") {
            user[a] = document.getElementById(a).value;
        } else {
            let uniqueData = uniqueIdentifier();
            console.log(uniqueData)
            user[a] = uniqueData;
        }
    }
    return user;
}
function readDataFromFOMForUpdate() {
    const user = readObject();
    for (a in user) {
        if (a !== "id") {
            user[a] = document.getElementById(a).value;
        } else {
            user[a] = document.getElementById(a).value;;
        }
    }
    return user;
}
addUser = () => {
    const user = readDataFromFOM();
    console.log(user);
    const postUser = new XMLHttpRequest();
    postUser.open("POST", "http://localhost:3000/demo1");
    postUser.setRequestHeader("Content-Type", "Application/json");
    postUser.send(JSON.stringify(user));
    postUser.onreadystatechange = function () {
        if (postUser.readyState == 4 && postUser.status == 201) {
            console.log("Data added successfully...!!!")
        }
    }
    getDataFromAPI();
}

var users = [];
function getDataFromAPI() {
    const getUser = new XMLHttpRequest();
    getUser.open("GET", "http://localhost:3000/demo1");
    getUser.send();
    getUser.onreadystatechange = function () {
        if (getUser.readyState == 4 && getUser.status == 200) {
            // console.log(JSON.parse(getUser.response));
            users = JSON.parse(getUser.response);
            displayUser(users);
        }
    }
}
getDataFromAPI();

deleteUser = (user) => {
    console.log(user)
    const delUser = new XMLHttpRequest();
    delUser.open("DELETE", "http://localhost:3000/demo1/" + user.id);
    delUser.send();
    // console.log(i)
}

let addToggle = document.querySelector("#adduser");
let updateToggle = document.querySelector("#updateuser");

editUser = (user) => {
    console.log(user);
    for (a in user) {
        document.getElementById(a).value = user[a];
    }

    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block")
}

updateUser = () => {
    const user = readDataFromFOMForUpdate();
    console.log(user);

    var updUser = new XMLHttpRequest();
    updUser.open("PUT", "http://localhost:3000/demo1/" + user.id);
    updUser.send(JSON.stringify(user));

    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none")
    displayUser(users);
}
function displayUser(users) {
    console.log(users);
    document.querySelector("tbody").innerHTML = "";
    users.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            myTd.innerHTML = data[a];
            myTr.appendChild(myTd);
        }
        var myEditTd = document.createElement("td");
        var myEditButton = document.createElement("button");
        myEditButton.innerHTML = "Edit";
        myEditTd.addEventListener("click", function () {
            editUser(data);
        })
        myEditTd.appendChild(myEditButton);
        myTr.appendChild(myEditTd);

        var myDeleteTd = document.createElement("td");
        var myDeleteButton = document.createElement("button");
        myDeleteButton.innerHTML = "Delete";
        myDeleteButton.addEventListener("click", function () {
            deleteUser(data);
        })
        myDeleteTd.appendChild(myDeleteButton);
        myTr.appendChild(myDeleteTd);

        document.querySelector("tbody").appendChild(myTr);
    })
}
