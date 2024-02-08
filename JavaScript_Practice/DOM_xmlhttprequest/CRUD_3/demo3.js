function uniqueIdentifier() {
    let random = Math.random().toString(36).substring(2, 12);
    // console.log(random);
    return random;
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

function readDataFromFOM() {
    var data = returnObj()
    console.log(data)
    for (a in data) {
        if (a != "image" && a !== "status" && a != "areasOfInterest" && a !== "id") {
            data[a] = document.getElementById(a).value;
        } else if (a == "image") {
            data[a] = document.getElementById(a).value;
        } else if (a == "status") {
            var allStatus = document.getElementsByName("status");
            allStatus.forEach((element) => {
                if (element.checked) {
                    data[a] = element.value;
                }
            })
        } else if (a == "areasOfInterest") {
            var allCheckboxes = document.getElementsByName("areasOfInterest");
            allCheckboxes.forEach((element) => {
                if (element.checked) {
                    data[a].push(element.value);
                }
            })
        } else if (a == "id") {
            let randomIdentifier = uniqueIdentifier();
            data[a] = randomIdentifier;
        }
    }

    return data;
}

addUniversityDetails = () => {
    var data = readDataFromFOM();
    var postData = new XMLHttpRequest();
    postData.open("POST", "http://localhost:3000/demo3");
    postData.setRequestHeader("Content-Type", "Application/json");
    postData.send(JSON.stringify(data));
}
var universityDetails = [];
function getDetailsFromAPI() {
    const getData = new XMLHttpRequest();
    getData.open("GET", "http://localhost:3000/demo3");
    getData.send();
    getData.onreadystatechange = function () {
        if (getData.readyState == 4 && getData.status == 200) {
            universityDetails = JSON.parse(getData.response);
            displayUniversityDetails(universityDetails);
        }
    }
}
getDetailsFromAPI();

function displayUniversityDetails(universityDetails) {
    universityDetails.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            myTd.innerHTML = data[a];
            myTr.appendChild(myTd);
        }
        var myEditTd = document.createElement("td");
        var myEditButton = document.createElement("button");
        myEditButton.innerHTML = "EDIT";
        myEditButton.addEventListener("click", (() => {
            editDetails(data);
        }))
        myEditTd.appendChild(myEditButton);
        myTr.appendChild(myEditTd);

        var myDeleteTd = document.createElement("td");
        var myDeleteButton = document.createElement("button");
        myDeleteButton.innerHTML = "DELETE";
        myDeleteButton.addEventListener("click", (() => {
            deleteDetails(data);
        }))
        myDeleteTd.appendChild(myDeleteButton);
        myTr.appendChild(myDeleteTd);

        document.querySelector("tbody").appendChild(myTr);
    })
}

deleteDetails = (data) => {
    var deleteData = new XMLHttpRequest();
    deleteData.open("DELETE", "http://localhost:3000/demo3/" + data.id);
    deleteData.send();
}

editDetails = (data) => {
    for (a in data) {
        if (a != "image" && a !== "status" && a != "areasOfInterest") {
            document.getElementById(a).value = data[a];
        } else if (a == "image") {
            document.getElementById(a).value = data[a];
        } else if (a == "status") {
            var allStatus = document.getElementsByName("status");
            // console.log(allStatus)
            allStatus.forEach((element,i) => {
                if(element.value == data[a]){
                    element.checked = true;
                }
            })
        } else if (a == "areasOfInterest") {
            var allCheckboxes = document.getElementsByName("areasOfInterest");
            allCheckboxes.forEach((element) => {
                data[a].forEach((subData,index)=>{
                    if(element.value == subData){
                        element.checked = true;
                    }
                })
            })
        }
    }
}