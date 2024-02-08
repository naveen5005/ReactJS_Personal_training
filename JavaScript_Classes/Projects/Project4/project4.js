readDataFromForm = () => {
  var user = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    state: "",
    country: "",
    area: "",
    post: "",
  };

  for (const a in user) {
    user[a] = document.getElementById(a).value;
  }
  return user;
};
var users = JSON.parse(localStorage.getItem('users'))
if (!users) users = [];
addUser = () => {
  var user = readDataFromForm();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "displayUsers.html"
  console.log("addUser Calld");
};
