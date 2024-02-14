function returnObj() {
    return {
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: {
            rate: "",
            count: ""
        }
    }
}
function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}
function readOnlyDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = uniqueIdentifier();
        } else if (a == "image") {
            data[a] = document.getElementById(a).value;
        } else if (a == "rating") {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        } else {
            data[a] = document.getElementById(a).value;
        }
    }
    return data;
}
let crud2_array = JSON.parse(localStorage.getItem("LS_CRUD02"));
if (!crud2_array) crud2_array = [];
addProduct = () => {
    var data = readOnlyDataFromFOM();
    crud2_array.push(data);
    localStorage.setItem("LS_CRUD02", JSON.stringify(crud2_array));
    displayProduct();
}
createDynamicBtns = (text, target, event, data, i) => {
    var Td = document.createElement("td");
    var Button = document.createElement("button");
    Button.innerHTML = text;
    Button.addEventListener("click", function () {
        event(data, i);
    });
    Td.appendChild(Button);
    target.appendChild(Td);
}
function displayProduct() {
    document.querySelector("tbody").innerHTML = "";
    crud2_array.forEach((data, i) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a !== "rating" && a !=="image") {
                myTd.innerHTML = data[a];
                myTr.appendChild(myTd);
            } else if (a == "image") {
                var Image = document.createElement("img");
                Image.setAttribute("src", data[a]);
                Image.setAttribute("width", "100px");
                Image.setAttribute("height", "100px");
                myTd.appendChild(Image);
                myTr.appendChild(myTd);
            } else if (a == "rating") {
                for (b in data[a]) {
                    var InnerTd = document.createElement("td");
                    InnerTd.innerHTML = data[a][b];
                    myTr.appendChild(InnerTd);
                }
            }
        }
        createDynamicBtns("EDIT", myTr, editProduct, data, i);
        createDynamicBtns("DELETE", myTr, deleteProduct, data);
        document.querySelector("tbody").appendChild(myTr);
    })
}
displayProduct();
let updateIndex = null;
let addToggle = document.querySelector("#addproduct");
let updateToggle = document.querySelector("#updateproduct");
function editProduct(data, i) {
    updateIndex = i;
    for(a in data){
        if( a!=="rating"){
            document.getElementById(a).value = data[a];
        }else{
            for(b in data[a]){
                document.getElementById(b).value = data[a][b];
            }
        }
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
function deleteProduct(data) {
    crud2_array = crud2_array.filter((element) => { return element.id !== data.id });
    localStorage.setItem("LS_CRUD02", JSON.stringify(crud2_array));
    displayProduct();
}
updateProduct = () =>{
    var data = readOnlyDataFromFOM();
    crud2_array[updateIndex] = data;
    localStorage.setItem("LS_CRUD02",JSON.stringify(crud2_array));
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
    displayProduct();
}