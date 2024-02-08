let allRecomends = document.getElementsByName("ans");
var allLanguages = document.querySelectorAll(".languages");
readDataFromForm = () => {
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
};
commonServerCommunication = (method) => {
  let payload = readDataFromForm();
  let url = "";
  if (method === "GET" || method === "POST") {
    url = "http://localhost:3000/users";
  } else if (method === "DELETE" || method === "PUT") {
    url = "http://localhost:3000/users/" + payload.id;
  }
  var postData = new XMLHttpRequest();
  postData.open(method, url);
  // postData.setRequestHeader("Content-Type", "Application/json");
  postData.send(payload ? JSON.stringify(payload) : null);
  postData.onreadystatechange = function () {
    if (postData.readyState == 4 && postData.status == 201) {
      console.log("User Created Successfully");
    }
  };
};
