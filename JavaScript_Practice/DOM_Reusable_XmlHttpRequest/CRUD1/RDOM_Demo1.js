function uniqueIdentifier() {
    return Math.random().toString(36).substring(2, 12);
}
function returnObj() {
    return ({
        id: "",
        username: "",
        email: "",
        age: "",
        city: ""
    })
}

function readDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            console.log(data[a] , typeof(data[a]))
            data[a] = uniqueIdentifier();
            //  data[a] === "" ? uniqueIdentifier() : document.getElementById(a).value;
        } else {
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}

addUser = () => {
    commonServerCommunication("POST");
}

commonServerCommunication = (method) => {
    var payload = readDataFromFOM();
    if (method === "POST") {
        url = "http://localhost:3000/demo1"
    } else {
        url = "http://localhost:3000/demo1/" + payload.id;
    }
    var postUser = new XMLHttpRequest();
    postUser.open(method, url);
    postUser.send(payload ? JSON.stringify(payload) : null);
}
let users = [];

getDataFromAPI = () => {
    var getUsers = new XMLHttpRequest();
    getUsers.open("GET", "http://localhost:3000/demo1");
    getUsers.send();
    getUsers.onreadystatechange = function () {
        if (getUsers.readyState == 4 && getUsers.status == 200) {
            users = JSON.parse(getUsers.response);
            displayUser(users);
        }
    }
}
getDataFromAPI();

createDynamicTh = (target, text) => {
    var myTh = document.createElement("th");
    myTh.innerHTML = text;
    target.appendChild(myTh);
}

commonDataDisplayTable = (cell, obj, target, i) => {
    var myTr = document.createElement("tr");
    for (a in obj) {
        var myTh = document.createElement(cell);
        myTh.innerHTML = cell === "th" ? a : obj[a];
        myTr.appendChild(myTh);
    }
    if (cell === "td") {
        createDynamicButtons("EDIT", myTr, "EditUser", i);
        createDynamicButtons("DELETE", myTr, "DeleteUser", i);
    } else {
        createDynamicTh(myTr, "EDIT");
        createDynamicTh(myTr, "DELETE");
    }
    document.querySelector(target).appendChild(myTr);
}

commonDataDisplayTable("th", returnObj(), "thead");

function displayUser(users) {
    users.forEach((data, i) => {
        commonDataDisplayTable("td", data, "tbody", i);
    })
}

createDynamicButtons = (text, target, event, i) => {
    var myTd = document.createElement("td");
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.setAttribute("onclick", event + "(" + i + ")");
    myTd.appendChild(btn);
    target.appendChild(myTd);
}

DeleteUser = (i) => {
    var deletePayload = new XMLHttpRequest();
    deletePayload.open("DELETE", "http://localhost:3000/demo1/" + users[i].id);
    deletePayload.send();
}
let updateIndex = null;
let addToggle = document.getElementById("adduser");
let updateToggle = document.getElementById("updateuser");

EditUser = (i) => {
    updateIndex == i;
    for (a in users[i]) {
        document.getElementById(a).value = users[i][a];
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
updateUser = () => {
    commonServerCommunication("PUT");

    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}
