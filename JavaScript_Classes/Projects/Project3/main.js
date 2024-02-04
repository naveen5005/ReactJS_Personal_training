function addUser() {
  var user = {
    name: "",
    email: "",
    age: null,
    occupation: "",
    recomend: null,
    languages: [],
    message: "",
  };
  for (const a in user) {
    if (a !== "recomend" && a !== "languages" && a !== "age") {
      user[a] = document.getElementById(a).value;
    } else if (a === "age") {
      user[a] = Number(document.getElementById(a).value);
    } else if (a == "recomend") {
      let allRecomends = document.getElementsByName("ans");
      for (let index = 0; index < allRecomends.length; index++) {
        const element = allRecomends[index];
        if (element.checked) {
          user["recomend"] = element.value;
        }
      }
    } else if (a == "languages") {
      var allLanguages = document.querySelectorAll(".languages");
      for (let index = 0; index < allLanguages.length; index++) {
        const element = allLanguages[index];
        if (element.checked) {
          user["languages"].push(element.name);
        }
      }
    }
  }
  console.log(user);
}

function handleChange(element) {
  console.log(element.checked);
  
}
