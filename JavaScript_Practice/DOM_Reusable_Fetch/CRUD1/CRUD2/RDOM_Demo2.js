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

function readDataFromFOM() {
    var data = returnObj();
    for (a in data) {
        if (a == "id") {
            data[a] = document.getElementById(a).value = "" ? uniqueIdentifier() : document.getElementById(a).value;
        }
        else if (a !== "rating") {
            data[a] = document.getElementById(a).value;
        } else {
            for (b in data[a]) {
                data[a][b] = document.getElementById(b).value;
            }
        }
    }
    return data;
}

commonServerCommunication = (method, data) => {
    var payload = readDataFromFOM();
    method === "POST" || method === "GET" ? url = "http://localhost:3000/demo2" : url = "http://localhost:3000/demo2/" + data.id
    fetch(url, {
        method: method,
        headers: { 'Content-type': 'application.json' },
        body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Response is not ok......!!!");
        }
        return response.json();
    }).then((products) => {
        displayProducts(products);
    })
}
addProduct = () => {
    commonServerCommunication("POST")
}

getDataFromAPI = () => {
    commonServerCommunication("GET")
}
getDataFromAPI();

createDynamicTh = (text, target) => {
    var myTh = document.createElement("th");
    myTh.innerHTML = text;
    myTh.setAttribute("rowspan","2");
    target.appendChild(myTh)
}
createDynamicButtons = (text, target, event, data) => {
    var TD = document.createElement("td");
    var BUTTON = document.createElement("button");
    BUTTON.innerHTML = text;
    BUTTON.addEventListener("click", function () {
        event(data);
    })
    TD.appendChild(BUTTON);
    target.appendChild(TD);
}
commonDisplayDataTable = (cell, obj, target, data) => {
    var myTr = document.createElement("tr");
    for (a in obj) {
        var myTh = document.createElement(cell);
        if (a !== "rating") {
            if (a == "image") {
                if (cell === "th") {
                    myTh.innerHTML = a;
                    myTh.setAttribute("rowspan", "2");
                    myTr.appendChild(myTh)
                } else {
                    var myImge = document.createElement("img");
                    myImge.setAttribute("src", obj[a]);
                    myImge.setAttribute("width", "100px");
                    myImge.setAttribute("height", "100px");
                    myTh.appendChild(myImge);
                    myTr.appendChild(myTh);
                }
            } else {
                myTh.innerHTML = cell === "th" ? a : obj[a];
                cell === "th" ? myTh.setAttribute("rowspan", "2") : null;
                myTr.appendChild(myTh)
            }
        }
        else {
            if (cell === "th") {
                myTh.innerHTML = a;
                myTh.setAttribute("colspan", "2");
                myTr.appendChild(myTh)

                var myInnerTr = document.createElement("tr");
                for (b in obj[a]) {
                    var myInnerTh = document.createElement(cell);
                    myInnerTh.innerHTML = b;
                    myInnerTr.appendChild(myInnerTh);
                }
            } else {
                for (b in obj[a]) {
                    var myInnerTh = document.createElement(cell);
                    myInnerTh.innerHTML = obj[a][b];
                    myTr.appendChild(myInnerTh);
                }
            }

        }
    }
    if (cell == "th") {
        document.querySelector(target).appendChild(myTr);
        document.querySelector(target).appendChild(myInnerTr);
        createDynamicTh("EDIT", myTr);
        createDynamicTh("DELETE", myTr);
    } else {
        document.querySelector(target).appendChild(myTr);
        createDynamicButtons("Edit", myTr, editProduct, data);
        createDynamicButtons("Delete", myTr, deleteProduct, data);
    }

}
commonDisplayDataTable("th", returnObj(), "thead");

displayProducts = (products) => {
    products.forEach((data) => {
        commonDisplayDataTable("td", data, "tbody", data);
    })
}
let addToggle = document.getElementById("adduser");
let updateToggle = document.getElementById("updateuser");
editProduct = (data) => {
    for (a in data) {
        if (a == "rating") {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        } else {
            document.getElementById(a).value = data[a]
        }
    }
    addToggle.setAttribute("style", "display:none");
    updateToggle.setAttribute("style", "display:block");
}
deleteProduct = (data) => {
    commonServerCommunication("DELETE", data)
}
updateProduct = () => {
    var data = readDataFromFOM();
    commonServerCommunication("PUT", data)
    addToggle.setAttribute("style", "display:block");
    updateToggle.setAttribute("style", "display:none");
}