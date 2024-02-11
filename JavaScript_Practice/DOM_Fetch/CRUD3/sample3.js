function uniqueIdentifier(length) {
    const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let random = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        random += charset[randomIndex];
    }
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
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value == "" ?uniqueIdentifier(20) : document.getElementById(a).value ;
        }else if (a == "image") {
            data[a] = document.getElementById(a).value;
        } else if (a == "status") {
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element) => {
                if (element.checked) {
                    data[a] = element.value;
                }
            })
        } else if (a == "areasOfInterest") {
            var allCheckboxes = document.getElementsByName(a);
            allCheckboxes.forEach((element) => {
                if (element.checked) {
                    data[a].push(element.value);
                }
            })
        }else{
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
addUniversityDetails = () => {
    var data = readDataFromFOM();
    fetch("http://localhost:3000/demo3", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}
getDataFromAPI=()=>{
    fetch("http://localhost:3000/demo3",{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        body:null
    }).then((response)=>{
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((universityLists)=>{
        displayUniversity(universityLists)
    })
}
getDataFromAPI();

displayUniversity = (universityLists) =>{
    universityLists.forEach((data)=>{
        var myTr = document.createElement("tr");
        for(a in data){
            var myTd = document.createElement("td");
            if(a=="image"){
                var myImage = document.createElement("img");
                myImage.setAttribute("src",data[a]);
                myImage.setAttribute("width","100px");
                myImage.setAttribute("height","100px");
                myTd.appendChild(myImage);
            }else{
                myTd.innerHTML=data[a];
            }
            myTr.appendChild(myTd);

        }
        var myEditTd = document.createElement("td");
        var myEditBtn = document.createElement("button");
        myEditBtn.innerHTML = "EDIT";
        myEditBtn.addEventListener("click",function(){
            editUniversity(data);
        })
        myEditTd.appendChild(myEditBtn);
        myTr.appendChild(myEditTd);

        var myDeleteTd = document.createElement("td");
        var myDeleteBtn = document.createElement("button");
        myDeleteBtn.innerHTML = "DELETE";
        myDeleteBtn.addEventListener("click",function(){
            deleteUniversity(data);
        })
        myDeleteTd.appendChild(myDeleteBtn);
        myTr.appendChild(myDeleteTd);

        document.querySelector("tbody").appendChild(myTr);
    })
}

deleteUniversity = (data) =>{
    fetch("http://localhost:3000/demo3/"+data.id,{
        method : "DELETE",
        headers : {'Content-Type':'application/json'},
        body: null
    })
}
var addToggle = document.getElementById("addUniveristy");
var UpdateToggle = document.getElementById("updateUniversity");
editUniversity = (data) =>{
    for(a in data){
        if(a!=="image" && a!=="status" &&  a!=="areasOfInterest"){
            document.getElementById(a).value = data[a]
        }else if(a == "image"){
            document.getElementById(a).value = data[a]
        }else if(a == "status"){
            var allRadioBtns = document.getElementsByName("status");
            allRadioBtns.forEach((element)=>{
                if(element.value == data[a]){
                    element.checked = true;
                }
            })
        }else if(a == "areasOfInterest"){
            var allCheckboxes = document.getElementsByName("areasOfInterest");
            allCheckboxes.forEach((element)=>{
                data[a].forEach((data)=>{
                    if(element.value == data){
                        element.checked = true;
                    }
                })
            })
        }
    }
    addToggle.setAttribute("style","display:none");
    UpdateToggle.setAttribute("style","display:block");

    updateUniversityDetails = () =>{
        var data = readDataFromFOM();
        fetch("http://localhost:3000/demo3/"+data.id,{
            method :"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
    }
}