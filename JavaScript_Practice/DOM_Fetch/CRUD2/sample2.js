function uniqueIdentifier() {
    return Math.random().toString(36).substring(2, 12);
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
            data[a] = document.getElementById(a).value == "" ? uniqueIdentifier() : document.getElementById(a).value;
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
addProduct = () => {
    var data = readDataFromFOM();
    fetch("http://localhost:3000/demo2", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}
function getDataFromAPI() {
    fetch("http://localhost:3000/demo2", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: null
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((products) => {
        displayProducts(products)
    })
}
getDataFromAPI();

dynamicButtons = (text, event, data, target) => {
    var myEditTd = document.createElement("td");
    var myEditBtn = document.createElement("button");
    myEditBtn.innerHTML = text;
    myEditBtn.addEventListener("click", function () {
        event(data);
    })
    myEditTd.appendChild(myEditBtn);
    target.appendChild(myEditTd);
}

function displayProducts(products) {
    products.forEach((data) => {
        var myTr = document.createElement("tr");
        for (a in data) {
            var myTd = document.createElement("td");
            if (a == "image") {
                var myImage = document.createElement("img");
                myImage.setAttribute("src", data[a]);
                myImage.setAttribute("width", "100px");
                myImage.setAttribute("height", "100px");
                myTd.appendChild(myImage);
                myTr.appendChild(myTd);
            } else if (a == "rating") {
                for (b in data[a]) {
                    var myInnerTd = document.createElement("td")
                    myInnerTd.innerHTML = data[a][b];
                    myTr.appendChild(myInnerTd);
                }
            }
            else {
                myTd.innerHTML = data[a];
                myTr.appendChild(myTd);
            }

        }
        dynamicButtons("EDIT", editProduct, data, myTr);
        dynamicButtons("DELETE", deleteProduct, data, myTr);
        document.querySelector("tbody").appendChild(myTr);
    })
}

deleteProduct = (data) => {
    fetch("http://localhost:3000/demo2/" + data.id, {
        method: "DELETE",
        headers: { 'Content-type': 'application/json' },
        body: null
    })
}
var addproductToggle = document.getElementById("addproduct");
var updateproductToggle = document.getElementById("updateproduct");
editProduct = (data) => {
    console.log(data)
    for (a in data) {
        if (a == "rating") {
            for (b in data[a]) {
                document.getElementById(b).value = data[a][b];
            }
        } else {
            document.getElementById(a).value = data[a];
        }
    }
    addproductToggle.setAttribute("style", "display:none");
    updateproductToggle.setAttribute("style", "display:block");
}
updateProduct = () => {
    var data = readDataFromFOM();
    fetch("http://localhost:3000/demo2/" + data.id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    addproductToggle.setAttribute("style", "display:block");
    updateproductToggle.setAttribute("style", "display:none");
}