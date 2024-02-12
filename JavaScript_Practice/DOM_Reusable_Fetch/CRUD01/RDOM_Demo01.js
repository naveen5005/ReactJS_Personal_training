function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}

function returnObj() {
    return {
        id: "",
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
            data[a] = data[a] === "" ? uniqueIdentifier() : document.getElementById(a).value;
        } else {
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}

commonServerCommunication = (method, data) => {
    var payload = readDataFromFOM();
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo1" : url = "http://localhost:3000/demo1/" + data.id;
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method === "POST" || method === "PUT"  ? JSON.stringify(payload) : null,
    }).then((response) => {
        if (!response.ok) {
            throw new Error("response is not ok");
        }
        return response.json();
    }).then((users) => {
        displayUsers(users);
        console.log(users);
    })
}

addUser = () => {
    commonServerCommunication("POST");
}

getDataFromAPI = () => {
    commonServerCommunication("GET")
}

getDataFromAPI();

createDynamicTh = (cell, text, target) => {
    var myTh = document.createElement(cell);
    myTh.innerHTML = text;
    target.appendChild(myTh);
}

createDynamicButtons = (text, event, target, obj) => {
    var myTd = document.createElement("td");
    var myButton = document.createElement("button");
    myButton.innerHTML = text;
    myButton.addEventListener("click", function () {
        event(obj);
    })
    myTd.appendChild(myButton);
    target.appendChild(myTd);
}

commonDisplayDataTable = (cell, obj, target) => {
    var myTr = document.createElement("tr");
    for (a in obj) {
        var myTh = document.createElement(cell);
        myTh.innerHTML = cell === "th" ? a : obj[a];
        myTr.appendChild(myTh)
    } if (cell === "td") {
        createDynamicButtons("EDIT", editUser, myTr, obj);
        createDynamicButtons("DELETE", deleteUser, myTr, obj);
    } else {
        createDynamicTh("th", "EDIT", myTr);
        createDynamicTh("th", "DELETE", myTr);
    }
    document.querySelector(target).appendChild(myTr);
}

commonDisplayDataTable("th", returnObj(), "thead");

displayUsers = (users) => {
    users.forEach((data, i) => {
        commonDisplayDataTable("td", data, "tbody");
    })
}

let updateIndexObj = null;
let addToggle = document.getElementById("adduser");
let updateToggle = document.getElementById("updateuser");

editUser = (data) => {
    updateIndexObj = data;
    for (a in data) {
        document.getElementById(a).value = data[a];
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}

deleteUser = (data) => {
    commonServerCommunication("DELETE", data);
}

updateUser = () =>{
    commonServerCommunication("PUT",updateIndexObj);
    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}