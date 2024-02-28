function uniqueIdentifier() {
    return Math.random().toString(36).substring(2,);
}
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
function readDataFromFOM(){
    var data = returnObj();
    for(a in data){
        if(a == "id"){
            data[a] = document.getElementById(a).value === "" ? uniqueIdentifier() : document.getElementById(a).value;
        }
        else if(a !== "rating"){
            data[a] = document.getElementById(a).value;
        }
        else{
            for(b in data[a]){
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}

createHTMLElement = (element) => {
    return document.createElement(element);
}
createDynamicTh = (text, target) => {
    var myTh = createHTMLElement("th");
    myTh.innerHTML = text;
    myTh.setAttribute("rowspan", "2");
    target.appendChild(myTh);
}
createDynamicButtons = (text, target, event, obj) => {
    var Td = createHTMLElement("td");
    var button = createHTMLElement("button");
    button.innerHTML = text;
    button.setAttribute("type", "button");
    button.addEventListener("click", function () {
        event(obj)
    })
    Td.appendChild(button);
    target.appendChild(Td);
}
deleteProduct = (product) => {
    commonServerCommunication("DELETE", product)
}
const addToggle = document.getElementById("addproduct");
const updateToggle = document.getElementById("updateproduct");
editProduct = (product) => {
    for (a in product) {
        if (a !== "rating") {
            document.getElementById(a).value = product[a]
        } else {
            for (b in product[a]) {
                document.getElementById(b).value = product[a][b]
            }
        }
    }
    addToggle.setAttribute("style","display:none");
    updateToggle.setAttribute("style","display:block");
}
updateProduct = () =>{
    var data = readDataFromFOM();
    commonServerCommunication("PUT",data);
    addToggle.setAttribute("style","display:block");
    updateToggle.setAttribute("style","display:none");
}
addProduct = () => {
    var data = readDataFromFOM();
    commonServerCommunication("POST",data);
}
commonTableDataDisplay = (cell, obj, target) => {
    var myTr = createHTMLElement("tr");
    for (a in obj) {
        if (a === "rating") {
            var myTh = createHTMLElement(cell);
            if (cell === "th") {
                myTh.innerHTML = a;
                myTh.setAttribute("colspan", "2");
                myTr.appendChild(myTh);

                var myInnerTr = createHTMLElement("tr");
                for (b in obj[a]) {
                    var myInnerTh = createHTMLElement(cell);
                    myInnerTh.innerHTML = b;
                    myInnerTr.appendChild(myInnerTh);
                }
            } else {
                for (b in obj[a]) {
                    var myInnerTh = createHTMLElement(cell);
                    myInnerTh.innerHTML = obj[a][b];
                    myTr.appendChild(myInnerTh);
                }
            }
        } else if (a === "image") {
            var myTh = createHTMLElement(cell);
            var myImg = createHTMLElement("img");
            myTh.innerHTML = cell === "th" ? a : null;
            cell === "td" ? myImg.setAttribute("src", obj[a]) : null;
            cell === "td" ? myImg.setAttribute("width", "100px") : null;
            cell === "td" ? myImg.setAttribute("height", "100px") : null;
            cell === "th" ? myTh.setAttribute("rowspan", "2") : null;
            myTh.appendChild(myImg)
            myTr.appendChild(myTh);
        }
        else {
            var myTh = createHTMLElement(cell);
            myTh.innerHTML = cell === "th" ? a : obj[a];
            cell === "th" ? myTh.setAttribute("rowspan", "2") : null;
            myTr.appendChild(myTh);
        }
    }
    if (cell === "th") {
        document.querySelector(target).appendChild(myTr);
        document.querySelector(target).appendChild(myInnerTr);
        createDynamicTh("EDIT", myTr);
        createDynamicTh("DELETE", myTr);
    } else {
        document.querySelector(target).appendChild(myTr);
        createDynamicButtons("Edit", myTr, editProduct, obj);
        createDynamicButtons("Delete", myTr, deleteProduct, obj);
    }

}
displayProducts = () => {
    commonTableDataDisplay("th", results[0], "thead");
    results.forEach((product) => {
        commonTableDataDisplay("td", product, "tbody");
    })
}

let results = [];
commonServerCommunication = async (method, payload) => {
    method === "GET" || method === "POST" ? url = "http://localhost:3000/demo2" : url = "http://localhost:3000/demo2/" + payload.id;
    results = await (await fetch(url,
        {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: method ==="PUT" || method ==="POST" ? JSON.stringify(payload) : null
        })).json();
    displayProducts();
}
commonServerCommunication("GET");