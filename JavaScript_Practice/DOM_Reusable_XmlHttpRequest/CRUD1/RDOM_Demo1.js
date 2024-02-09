function uniqueIdentifier() {
  return Math.random().toString(36).substring(2, 12);
}
function returnObj() {
  return {
    id:"",
    username: "",
    email: "",
    age: "",
    city: "",
  };
}

function readDataFromFOM() {
  var data = returnObj();
  for (a in data) {
    if (a == "id") {
      console.log(data[a], typeof data[a]);
    //   data[a] = null
    data[a] =  data[a] === "" ? uniqueIdentifier() : document.getElementById(a).value;
    } else {
      data[a] = document.getElementById(a).value;
    }
  }
  return data;
}

addUser = () => {
   
};

commonServerCommunication = (method, id) => {
  var payload = readDataFromFOM();
  var url =
    method === "GET" || method === "POST"
      ? "http://localhost:3000/demo1"
      : "http://localhost:3000/demo1/" + id;
  console.log(url);
  if (method === "GET" || method === "POST") {
    fetch(url,{
        method:method === "POST" ?  'post' : 'get',
        headers: { "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify(payload) : null,
    })
      .then((response) => response.json())
      .then((data) => {
        users=data;
        displayUser(data)
      }
      
      );
  } else if (method === "PUT" || method == "DELETE") {
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "PUT" ? JSON.stringify(payload) : null,
    }).then(() => commonServerCommunication("GET"));
  }

  //   if (method === "POST") {
  //     url = "http://localhost:3000/demo1";
  //   } else {
  //     url = "http://localhost:3000/demo1/" + payload.id;
  //   }
  //   var postUser = new XMLHttpRequest();
  //   postUser.open(method, url);
  //   postUser.send(payload ? JSON.stringify(payload) : null);
};
let users = [];

getDataFromAPI = () => {
  commonServerCommunication("GET");
  //   var getUsers = new XMLHttpRequest();
  //   getUsers.open("GET", "http://localhost:3000/demo1");
  //   getUsers.send();
  //   getUsers.onreadystatechange = function () {
  //     if (getUsers.readyState == 4 && getUsers.status == 200) {
  //       users = JSON.parse(getUsers.response);
  //       displayUser(users);
  //     }
  //   };
};
getDataFromAPI();

createDynamicTh = (target, text) => {
  var myTh = document.createElement("th");
  myTh.innerHTML = text;
  target.appendChild(myTh);
};

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
};

commonDataDisplayTable("th", returnObj(), "thead");

function displayUser(users) {
    document.querySelector("tbody").innerHTML = ""

  users.forEach((data, i) => {
    commonDataDisplayTable("td", data, "tbody", i);
  });
}

createDynamicButtons = (text, target, event, i) => {
  var myTd = document.createElement("td");
  var btn = document.createElement("button");
  btn.innerHTML = text;
  btn.setAttribute("onclick", event + "(" + i + ")");
  myTd.appendChild(btn);
  target.appendChild(myTd);
};

DeleteUser = (i) => {
  commonServerCommunication("DELETE",users[i].id);
  //   var deletePayload = new XMLHttpRequest();
  //   deletePayload.open("DELETE", "http://localhost:3000/demo1/" + users[i].id);
  //   deletePayload.send();
};
let updateIndex = null;
let addToggle = document.getElementById("adduser");
let updateToggle = document.getElementById("updateuser");

EditUser = (i) => {
  updateIndex = i;
  for (a in users[i]) {
    document.getElementById(a).value = users[i][a];
  }
  addToggle.setAttribute("style", "display:none");
  updateToggle.setAttribute("style", "display:block");
};
updateUser = () => {
  commonServerCommunication("PUT",users[updateIndex].id);
  addToggle.setAttribute("style", "display:block");
  updateToggle.setAttribute("style", "display:none");
};