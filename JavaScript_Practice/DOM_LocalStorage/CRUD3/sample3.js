function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}
function returnObj() {
    return {
        id: "",
        university: "",
        institute: "",
        branch: "",
        degree: "",
        status: "",
        areasOfInterest: [],
        category: "",
        image: "",
        joiningDate: ""
    }
}
function readDataFromFORM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value ==="" ? uniqueIdentifier() : document.getElementById(a).value;
        } else if (a !== "image" && a !== "status" && a !== "areasOfInterest") {
            data[a] = document.getElementById(a).value;
        } else if (a == "image") {
            data[a] = document.getElementById(a).value;
        } else if (a == "status") {
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element) => {
                if (element.checked) {
                    data[a] = element.value;
                }
            })
        } else if (a == "areasOfInterest") {
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element) => {
                if (element.checked) {
                    data[a].push(element.value);
                }
            })
        }
    }
    return data;
}
let updateIndex = null;
let addToggle = document.getElementById("addUniveristy");
let updateToggle = document.getElementById("updateUniversity");
let crud3_array = JSON.parse(localStorage.getItem("LS_CRUD3"));
if (!crud3_array) crud3_array = [];
addUniversityDetails = () => {
    var data = readDataFromFORM();
    crud3_array.push(data);
    localStorage.setItem("LS_CRUD3", JSON.stringify(crud3_array));
    displayUniversityDetails();
    clearForm();
}
dynamicButtons = (text, target, event, data, i) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click", function () {
        event(data, i);
    });
    Td.appendChild(Button);
    target.appendChild(Td);
}
function displayUniversityDetails() {
    document.querySelector("tbody").innerHTML = "";
    crud3_array.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a == "image") {
                var Image = document.createElement("img");
                Image.setAttribute("src", data[a]);
                Image.setAttribute("width", "100px");
                Image.setAttribute("height", "100px");
                myTd.appendChild(Image);
                myTr.appendChild(myTd);
            } else {
                myTd.innerHTML = data[a];
                myTr.appendChild(myTd);
            }
        }
        dynamicButtons("EDIT", myTr, editUser, data, i);
        dynamicButtons("DELETE", myTr, deleteUser, data);
        document.querySelector("tbody").appendChild(myTr);
    })
}
displayUniversityDetails();
function editUser(data, i) {
    updateIndex = i;
    for (a in data) {
        if (a !== "status" && a !== "areasOfInterest") {
            document.getElementById(a).value = data[a];
        } else if (a == "status") {
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element) => {
                if (element.value === data[a]) {
                    element.checked = true;
                }
            })
        } else if (a == "areasOfInterest") {
            console.log(data[a]);
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element) => {
                data[a].forEach((data) => {
                    if (data === element.value) {
                        element.checked = true;
                    }
                })
            })
        }
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
function deleteUser(data) {
    crud3_array = crud3_array.filter((element)=> data.id !== element.id)
    localStorage.setItem("LS_CRUD3",JSON.stringify(crud3_array));
    displayUniversityDetails();
}
function updateUniversityDetails(){
    var data = readDataFromFORM();
    crud3_array[updateIndex] = data;
    localStorage.setItem("LS_CRUD3",JSON.stringify(crud3_array));
    clearForm();
    displayUniversityDetails();
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}
function clearForm(){
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            document.getElementById(a).value ="";
        } else if (a !== "image" && a !== "status" && a !== "areasOfInterest") {
            document.getElementById(a).value="";
        } else if (a == "image") {
            document.getElementById(a).value="";
        } else if (a == "status") {
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element) => {
                element.checked = false;
            })
        } else if (a == "areasOfInterest") {
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element) => {
                element.checked = false;
            })
        }
    }

}