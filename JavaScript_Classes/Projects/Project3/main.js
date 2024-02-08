let allRecomends = document.getElementsByName("ans");
var allLanguages = document.querySelectorAll(".languages");
function readDataFromForm() {
  var user = {
    name: "",
    email: "",
    age: null,
    occupation: "",
    recomend: null,
    languages: [],
    message: "",
    id: null,
  };

  for (const a in user) {
    if (a !== "recomend" && a !== "languages" && a !== "age") {
      user[a] = document.getElementById(a).value;
    } else if (a === "age") {
      user[a] = Number(document.getElementById(a).value);
    } else if (a == "recomend") {
      for (let index = 0; index < allRecomends.length; index++) {
        const element = allRecomends[index];
        if (element.checked) {
          user["recomend"] = element.value;
        }
      }
    } else if (a == "languages") {
      for (let index = 0; index < allLanguages.length; index++) {
        const element = allLanguages[index];
        if (element.checked) {
          user["languages"].push(element.name);
        }
      }
    }
  }

  return user;
}
function addUser() {
  var user = readDataFromForm();
  postDataToAPI(user);
}

function handleChange(element) {
  console.log(element.checked);
}

function postDataToAPI(user) {
  user.id = Math.round(Math.random() * 10000);
  // console.log(user);
  commonServerCommunication("POST", user);
}

function getDataFromAPI() {
  var getData = new XMLHttpRequest();
  getData.open("GET", "http://localhost:3000/users");
  getData.send();
  getData.onreadystatechange = function () {
    if (getData.readyState == 4 && getData.status == 200) {
      console.log(JSON.parse(getData.response));
      users = JSON.parse(getData.response);
      displayUsers();
    }
  };
}

getDataFromAPI();
var users = [];
function displayUsers() {
  users.forEach((user, i) => {
    var myTr = document.createElement("tr");
    for (const key in user) {
      var mytd = document.createElement("td");
      mytd.innerHTML = user[key];
      myTr.appendChild(mytd);
    }
    // for Edit
    var editTd = document.createElement("td");
    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editTd.appendChild(editBtn);
    editBtn.addEventListener("click", function () {
      handleEdit(users[i]);
    });
    myTr.appendChild(editTd);
    //for Delete
    var deleteTd = document.createElement("td");
    var delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    deleteTd.appendChild(delBtn);
    delBtn.addEventListener("click", function () {
      console.log(users[i]);
      deleteUser(users[i]);
    });
    myTr.appendChild(deleteTd);
    document.querySelector("tbody").appendChild(myTr);
  });
}

function deleteUser(user) {
  var postData = new XMLHttpRequest();
  postData.open("DELETE", "http://localhost:3000/users/" + user.id);
  postData.send();
  postData.onreadystatechange = function () {
    if (postData.readyState == 4 && postData.status == 201) {
      console.log("User Updated Successfully");
    }
  };
}
function handleEdit(user) {
  for (a in user) {
    if (a !== "languages" && a !== "recomend") {
      document.getElementById(a).value = user[a];
    } else if (a == "languages") {
      // for (let index = 0; index < allLanguages.length; index++) {
      //   const element = array[index];

      // }
      allLanguages.forEach((element) => {
        element.checked = user.languages.some((val) => val === element.value);
      });
    } else if (a == "recomend") {
      allRecomends.forEach((element) => {
        console.log(element.value);
        console.log(user.recomend);
        element.checked = user.recomend == element.value;
      });
    }
  }
}

function updateUser(user) {
  var user = readDataFromForm();
  var postData = new XMLHttpRequest();
  postData.open("PUT", "http://localhost:3000/users/" + user.id);
  postData.setRequestHeader("Content-Type", "Application/json");
  postData.send(JSON.stringify(user));
  postData.onreadystatechange = function () {
    if (postData.readyState == 4 && postData.status == 201) {
      console.log("User Updated Successfully");
    }
  };
}

commonServerCommunicatio = (method, payload) => {
 
};
