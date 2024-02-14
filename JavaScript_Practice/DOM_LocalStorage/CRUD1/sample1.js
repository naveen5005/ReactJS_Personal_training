function uniqueIdentifier(){
    return Math.random().toString(36).substring(2,);
}
function returnObj(){
    return {
        id : "",
        username : "",
        email : "",
        age: "",
        city : ""
    }
}
function readDataFromFOM(){
    var data = returnObj();
    for(a in data){
        if(a == "id"){
            data[a] = document.getElementById(a).value ==="" ? uniqueIdentifier() :document.getElementById(a).value;
        }else{
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
let crud1_Array = JSON.parse(localStorage.getItem("LS_CRUD01"));
if(!crud1_Array) crud1_Array =[];
var addToggle = document.querySelector("#adduser");
var updateToggle = document.querySelector("#updateuser");
let updatedIndex = null;
addUser = () =>{
    var data = readDataFromFOM();
    crud1_Array.push(data);
    localStorage.setItem("LS_CRUD01",JSON.stringify(crud1_Array));
    clearForm();
    displayData();
}
clearForm = () => {
    var data = returnObj();
    for(a in data){
        document.getElementById(a).value = "";
    }
}
createDynamicBtns = (text,target,event,data,i) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click",(()=>{
        event(data,i);
    }))
    Td.appendChild(Button);
    target.appendChild(Td);
}
function displayData(){
    document.querySelector("tbody").innerHTML = "";
    crud1_Array.forEach((data,i)=>{
        var myTr = document.createElement("tr");
        for(a in data){
            var myTd = document.createElement("td");
            myTd.innerHTML = data[a];
            myTr.appendChild(myTd);
        }

        createDynamicBtns("EDIT",myTr,editUser,data,i);
        createDynamicBtns("DELETE",myTr,deleteUser,data);
        document.querySelector("tbody").appendChild(myTr);
    })
}
displayData();
function editUser(data,i){
    console.log(i);
    updatedIndex = i;
    for(a in data){
        document.getElementById(a).value = data[a];
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
function deleteUser(data){
    crud1_Array=crud1_Array.filter((element)=>{return element.id!==data.id});
    localStorage.setItem("LS_CRUD01",JSON.stringify(crud1_Array));
    displayData();
}
updateUser = () =>{
    var data = readDataFromFOM();
    crud1_Array[updatedIndex] = data;
    console.log(crud1_Array)
    localStorage.setItem("LS_CRUD01",JSON.stringify(crud1_Array));
    clearForm();
    displayData();
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}