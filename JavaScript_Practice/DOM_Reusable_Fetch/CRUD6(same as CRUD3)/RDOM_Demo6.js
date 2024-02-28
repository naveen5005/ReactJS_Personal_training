function uniqueIdentifier(){
    return Math.random().toString(36).substring(2,);
}
function returnObj(){
    return{
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
function readOnlyDataFromFOM(){
    var data = returnObj();
    for(a in data){
        if(a === "id"){
            data[a] = document.getElementById(a).value === "" ? uniqueIdentifier() : document.getElementById(a).value ;
        }else if(a === "status"){
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element)=>{
                if(element.checked){
                    data[a] = element.value
                }
            })
        }else if(a === "areasOfInterest"){
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element)=>{
                if(element.checked){
                    data[a].push(element.value);
                }
            })
        }else{
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
createDynamicTh = (text,target) =>{
    var myTh = document.createElement("th");
    myTh.innerHTML = text;
    target.appendChild(myTh);
}
dynamicButton = (text,event,obj,target) =>{
    var myTd = document.createElement("td");
    var myButton = document.createElement("button");
    myButton.innerHTML = text;
    myButton.addEventListener("click",function (){
        event(obj)
    })
    myTd.appendChild(myButton);
    target.appendChild(myTd);
}
commonDynamicTableDataDisplay = (cell,obj,target) =>{
    var myTr = document.createElement("tr");
    for(a in obj){
        if(a !== "image"){
            var myTh = document.createElement(cell);
            myTh.innerHTML = cell === "th" ? a : obj[a];
            myTr.appendChild(myTh);
        }else{
            if(cell === "th"){
                var myTh = document.createElement(cell);
                myTh.innerHTML = cell === "th" ? a : obj[a];
                myTr.appendChild(myTh);
            }else{
                var myTh = document.createElement(cell);
                var myImage = document.createElement("img");
                myImage.setAttribute("src",obj[a]);
                myImage.setAttribute("width","100px");
                myImage.setAttribute("height","100px");
                myTh.appendChild(myImage);
                myTr.appendChild(myTh);
            }
        }
    }
    if(cell === "th"){
        createDynamicTh("EDIT",myTr);
        createDynamicTh("DELETE",myTr);
    }else{
        dynamicButton("EDIT",editProduct,obj,myTr);
        dynamicButton("DELETE",deleteProduct,obj,myTr);
    }
    document.querySelector(target).appendChild(myTr);
}
let addToggle = document.getElementById("addUniveristy");
let updateToggle = document.getElementById("updateUniversity");
function editProduct(product){
    for(a in product){
        if(a !== "status" && a !== "areasOfInterest"){
            document.getElementById(a).value = product[a];
        }else if(a == "status"){
            var allRadioBtns = document.getElementsByName(a);
            allRadioBtns.forEach((element)=>{
                if(element.value === product[a]){
                    element.checked = true;
                }
            })
            console.log(allRadioBtns)
        }else if(a == "areasOfInterest"){
            var allCheckBoxes = document.getElementsByName(a);
            allCheckBoxes.forEach((element)=>{
                product[a].forEach((data)=>{
                    if(element.value === data){
                        element.checked = true;
                    }
                })
            })
        }
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
updateUniversityDetails = () =>{
    var updatePayload = readOnlyDataFromFOM();
    commonServerCommunication("PUT",updatePayload);
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}
function deleteProduct(product){
    commonServerCommunication("DELETE",product);
}
addUniversityDetails = () =>{
    var addPayload = readOnlyDataFromFOM();
    commonServerCommunication("POST",addPayload);
}
displayProducts = (products) => {
    commonDynamicTableDataDisplay("th",products[0],"thead");
    products.forEach((product)=>{
        commonDynamicTableDataDisplay("td",product,"tbody");
    })
}
commonServerCommunication = async(method,payload) =>{
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo3" : url = "http://localhost:3000/demo3/"+payload.id
    let results = await(await fetch(url,{
        method:method,
        headers:{'Content-Type':'application/json'},
        body: method === "POST" || method ==="PUT" ? JSON.stringify(payload) :null
    })).json();
    displayProducts(results);
}
commonServerCommunication("GET")