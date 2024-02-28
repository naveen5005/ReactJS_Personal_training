function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}
function returnObj() {
    return {
        id: "",
        username: "",
        email: "",
        age: "",
        city: ""
    }
}
function readDataFromFOM() {
    var data = returnObj();
    for(a in data){
        if(a === "id"){
            data[a] = document.getElementById(a).value === "" ? uniqueIdentifier() : document.getElementById(a).value
        }else{
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
let users =[];
dynamicTh = (text,target) =>{
    var Th = document.createElement("th");
    Th.innerHTML = text,
    target.appendChild(Th)
}
function deleteUser (deletePayload){
    commonServerCommunication("DELETE",deletePayload)
}
let addToggle = document.getElementById("adduser");
let updateToggle = document.getElementById("updateuser");
function editUser(data){
    for(a in data){
        document.getElementById(a).value = data[a];
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
updateUser = () =>{
    var updateData = readDataFromFOM();
    commonServerCommunication("PUT",updateData);
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}
addUser = () =>{
    var addPayload = readDataFromFOM();
    console.log(addPayload)
    commonServerCommunication("POST",addPayload);
}
createDynamicButtons = (text,target,event,obj) =>{
    var myTd = document.createElement("td");
    var button = document.createElement("button");
    button.innerHTML = text;
    button.addEventListener("click",function(){
        event(obj)
    })
    myTd.appendChild(button);
    target.appendChild(myTd);
}
commonTableDataDisplay = (cell,obj,target) =>{
    var myTr = document.createElement("tr");
    for(a in obj){
        var myTh = document.createElement(cell);
        myTh.innerHTML = cell === "th" ?a:obj[a];
        myTr.appendChild(myTh);
    }
    if(cell === "th"){
        dynamicTh("EDIT",myTr);
        dynamicTh("DELETE",myTr);
    } else{
        createDynamicButtons("Edit",myTr,editUser,obj);
        createDynamicButtons("Delete",myTr,deleteUser,obj);
    }
    document.querySelector(target).appendChild(myTr);
}
displayUsers = () =>{
    commonTableDataDisplay("th",users[0],"thead");
    users.forEach((data)=>{
        commonTableDataDisplay("td",data,"tbody");
    })
}
commonServerCommunication = async(method,payload)=>{
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo1" : url = "http://localhost:3000/demo1/"+payload.id
    users= await(await fetch(url,
    {
        method: method,
        headers :{'Content-Type':'application/json'},
        body :method ==="PUT" || method === "POST" ? JSON.stringify(payload) :null
    })).json()
    displayUsers();
    console.log(users)
}
commonServerCommunication("GET");