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
function readOnlyDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value == "" ? uniqueIdentifier() : document.getElementById(a).value;
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
        } else {
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
commonServerCommunication = (method, data) => {
    var payload = readOnlyDataFromFOM();
    method == "POST" || method == "GET" ? url = "http://localhost:3000/demo3" : url = "http://localhost:3000/demo3/" + data.id;
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application.json' },
        body: method == "POST" || method == "PUT" ? JSON.stringify(payload) : null,
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Response is not ok...!");
        }
        return response.json();
    }).then((universityDetails) => {
        displayUniveristyDetails(universityDetails);
    })
}
getDataFromAPI = () => {
    commonServerCommunication("GET");
}

getDataFromAPI();

addUniversityDetails = () => {
    commonServerCommunication("POST");
    console.log("Data is added....!!!")
}

createDynamicTh = (text, target) => {
    var myTh = document.createElement("th");
    myTh.innerHTML = text,
        target.appendChild(myTh);
}
createDynamicBtns = (text, target, event, data) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click", function () {
        event(data);
    })
    Td.appendChild(Button);
    target.appendChild(Td);
}
commonDisplayDataTable = (cell, target, obj) => {
    var myTr = document.createElement("tr");
    for (a in obj) {
        // cell === "td" ? console.log(obj[a]) : console.log(a)
        if (a !== "image") {
            var myTh = document.createElement(cell);
            myTh.innerHTML = cell === "th" ? a : obj[a];
            myTr.appendChild(myTh);
        } else {
            if (cell === "th") {
                var myTh = document.createElement(cell);
                myTh.innerHTML = cell === "th" ? a : obj[a];
                myTr.appendChild(myTh);
            } else {
                var myTh = document.createElement(cell);
                var myImage = document.createElement("img");
                myImage.setAttribute("src", obj[a]);
                myImage.setAttribute("alt", "no-Image available")
                myImage.setAttribute("width", "100px");
                myImage.setAttribute("height", "100px");
                myTh.appendChild(myImage);
                myTr.appendChild(myTh);
            }
        }

    }
    if (cell === "th") {
        createDynamicTh("EDIT", myTr);
        createDynamicTh("DELETE", myTr);
    } else {
        createDynamicBtns("Edit", myTr, editUniversity, obj);
        createDynamicBtns("Delete", myTr, deleteUniversity, obj);
    }

    document.querySelector(target).appendChild(myTr);
}
commonDisplayDataTable("th", "thead", returnObj());

displayUniveristyDetails = (universityDetails) => {
    universityDetails.forEach((data) => {
        commonDisplayDataTable("td", "tbody", data);
    })
}
let addToggle = document.getElementById("addUniveristy");
let updateToggle = document.getElementById("updateUniversity");
let updateUniversityData = null;
editUniversity = (data) => {
    updateUniversityData = data;
    for (a in data) {
        if (a !== "status" && a !== "areasOfInterest") {
            document.getElementById(a).value = data[a]
        } else if (a == "status") {
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element) => {
                if (element.value == data[a]) {
                    element.checked = true;
                }
            })
        } else if (a == "areasOfInterest") {
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element) => {
                data[a].forEach((data) => {
                    if (element.value === data) {
                        element.checked = true;
                    }
                })
            })
        }
    }

    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
deleteUniversity = (data) => {
    commonServerCommunication("DELETE", data)
}

updateUniversityDetails = () => {
   commonServerCommunication("PUT",updateUniversityData);
   addToggle.setAttribute("style", "display:block");
   updateToggle.setAttribute("style", "display:none");
}